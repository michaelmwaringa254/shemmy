import React, { useState, useEffect } from 'react';

// Simple Modal component
const Modal = ({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-all">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto relative animate-fade-in">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 transition-colors" onClick={onClose} aria-label="Close">
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
      <div className="fixed inset-0" onClick={onClose} />
    </div>
  );
};
import { supabase } from '../lib/supabase';
import {
  Save,
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Type,
  Code,
  FileText,
  Eye,
  EyeOff,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  File,
  Layout,
  PictureInPicture
} from 'lucide-react';

// Interfaces for each feature
interface Page {
  id: string;
  title: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CMSContent {
  id: string;
  section: string;
  key: string;
  type: 'text' | 'image' | 'html' | 'json';
  value: string;
  metadata: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface CMSImage {
  id: string;
  url: string;
  alt: string;
  section: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CMSManager = () => {
  const [activeMenu, setActiveMenu] = useState<'pages' | 'sections' | 'images' | 'menus' | 'builder'>('pages');
  // Page Builder state (move to top-level to persist across renders)
  const [pageComponents, setPageComponents] = useState<any[]>([]);

  // Menu builder state
  const [menus, setMenus] = useState<any[]>([]);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editMenuId, setEditMenuId] = useState<string | null>(null);
  const [newMenu, setNewMenu] = useState({ location: 'header', label: '', url: '', order: 1, is_active: true });

  // Pages state
  const [pages, setPages] = useState<Page[]>([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPage, setNewPage] = useState({ title: '', slug: '', is_active: true });

  // Sections add form
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSection, setNewSection] = useState({ section: '', key: '', type: 'text', value: '', is_active: true });

  // Images add form
  const [showAddImage, setShowAddImage] = useState(false);
  const [newImage, setNewImage] = useState({ url: '', alt: '', section: '', is_active: true });

  // Sections state (cms_content)
  const [sections, setSections] = useState<CMSContent[]>([]);
  const [loadingSections, setLoadingSections] = useState(false);

  // Images state
  const [images, setImages] = useState<CMSImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Shared
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Fetch data for each feature
  useEffect(() => {
    if (activeMenu === 'pages') fetchPages();
    if (activeMenu === 'sections') fetchSections();
    if (activeMenu === 'images') fetchImages();
    if (activeMenu === 'menus') fetchMenus();
    // eslint-disable-next-line
  }, [activeMenu]);

  // Add Page
  const handleAddPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data, error } = await supabase.from('cms_pages').insert([{ ...newPage }]);
      if (error) throw error;
      setShowAddPage(false);
      setNewPage({ title: '', slug: '', is_active: true });
      fetchPages();
      setMessage({ type: 'success', text: 'Page created successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create page' });
    }
  };

  // Add Section
  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data, error } = await supabase.from('cms_content').insert([{ ...newSection }]);
      if (error) throw error;
      setShowAddSection(false);
      setNewSection({ section: '', key: '', type: 'text', value: '', is_active: true });
      fetchSections();
      setMessage({ type: 'success', text: 'Section created successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create section' });
    }
  };

  // Add Image
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data, error } = await supabase.from('cms_images').insert([{ ...newImage }]);
      if (error) throw error;
      setShowAddImage(false);
      setNewImage({ url: '', alt: '', section: '', is_active: true });
      fetchImages();
      setMessage({ type: 'success', text: 'Image created successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create image' });
    }
  };

  // Fetch Pages
  const fetchPages = async () => {
    setLoadingPages(true);
    setMessage(null); // Clear any previous error
    try {
      // Use the correct table name: 'cms_pages'
      const { data, error } = await supabase.from('cms_pages').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase error loading pages:', error);
        throw error;
      }
      setPages(data || []);
      setMessage(null); // Clear error on success
    } catch (error) {
      console.error('Failed to load pages:', error);
      setMessage({ type: 'error', text: 'Failed to load pages' });
    } finally {
      setLoadingPages(false);
    }
  };

  // Fetch Sections
  const fetchSections = async () => {
    setLoadingSections(true);
    try {
      const { data, error } = await supabase.from('cms_content').select('*').order('section', { ascending: true });
      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load sections' });
    } finally {
      setLoadingSections(false);
    }
  };

  // Fetch Images
  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const { data, error } = await supabase.from('cms_images').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load images' });
    } finally {
      setLoadingImages(false);
    }
  };

  // Fetch Menus
  const fetchMenus = async () => {
    setLoadingMenus(true);
    try {
      const { data, error } = await supabase.from('cms_menus').select('*').order('order', { ascending: true });
      if (error) throw error;
      setMenus(data || []);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load menus' });
    } finally {
      setLoadingMenus(false);
    }
  };

  // Add Menu
  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data, error } = await supabase.from('cms_menus').insert([{ ...newMenu }]);
      if (error) throw error;
      setShowAddMenu(false);
      setNewMenu({ location: 'header', label: '', url: '', order: 1, is_active: true });
      fetchMenus();
      setMessage({ type: 'success', text: 'Menu item created successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create menu item' });
    }
  };

  // Edit Menu
  const handleEditMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data, error } = await supabase.from('cms_menus').update({ ...newMenu }).eq('id', editMenuId);
      if (error) throw error;
      setEditMenuId(null);
      setNewMenu({ location: 'header', label: '', url: '', order: 1, is_active: true });
      fetchMenus();
      setMessage({ type: 'success', text: 'Menu item updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update menu item' });
    }
  };

  // Delete Menu
  const handleDeleteMenu = async (id: string) => {
    setMessage(null);
    try {
      const { error } = await supabase.from('cms_menus').delete().eq('id', id);
      if (error) throw error;
      fetchMenus();
      setMessage({ type: 'success', text: 'Menu item deleted successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete menu item' });
    }
  };

  // Sidebar menu
  const menu = [
    { key: 'pages', label: 'Pages', icon: <File className="w-5 h-5" /> },
    { key: 'sections', label: 'Sections', icon: <Layout className="w-5 h-5" /> },
    { key: 'images', label: 'Images', icon: <PictureInPicture className="w-5 h-5" /> },
    { key: 'menus', label: 'Menu Builder', icon: <Layout className="w-5 h-5" /> },
    { key: 'builder', label: 'Page Builder', icon: <Layout className="w-5 h-5" /> },
  ];

  // Main content renderers
  const renderPages = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Pages</h3>
        <button
          className="flex items-center px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={() => setShowAddPage(v => !v)}
        >
          <Plus className="w-4 h-4 mr-1" /> Add New
        </button>
      </div>
      <Modal open={showAddPage} onClose={() => setShowAddPage(false)}>
        <form className="flex flex-col space-y-2" onSubmit={handleAddPage}>
          <h4 className="text-lg font-semibold mb-2">Add New Page</h4>
          <input
            className="border px-2 py-1 rounded"
            placeholder="Title"
            value={newPage.title}
            onChange={e => setNewPage({ ...newPage, title: e.target.value })}
            required
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Slug"
            value={newPage.slug}
            onChange={e => setNewPage({ ...newPage, slug: e.target.value })}
            required
          />
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={newPage.is_active}
              onChange={e => setNewPage({ ...newPage, is_active: e.target.checked })}
            />
            <span>Active</span>
          </label>
          <div className="flex space-x-2">
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
            <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => setShowAddPage(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
      {loadingPages ? (
        <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{page.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{page.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${page.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{page.is_active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-2"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderSections = () => {
    // Categorize sections
    const pageNames = ['about', 'services', 'ventures', 'contact'];
    const generalNames = ['header', 'footer', 'navbar', 'sidebar'];
    const pagesSections = sections.filter(s => pageNames.includes(s.section.toLowerCase()));
    const generalSections = sections.filter(s => generalNames.includes(s.section.toLowerCase()));
    const otherSections = sections.filter(s => !pageNames.includes(s.section.toLowerCase()) && !generalNames.includes(s.section.toLowerCase()));

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Sections</h3>
          <button
            className="flex items-center px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => setShowAddSection(v => !v)}
          >
            <Plus className="w-4 h-4 mr-1" /> Add New
          </button>
        </div>
        <Modal open={showAddSection} onClose={() => setShowAddSection(false)}>
        <form className="flex flex-col space-y-2" onSubmit={handleAddSection}>
          <h4 className="text-lg font-semibold mb-2">Add New Section</h4>
          <input
            className="border px-2 py-1 rounded"
            placeholder="Section"
            value={newSection.section}
            onChange={e => setNewSection({ ...newSection, section: e.target.value })}
            required
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Key"
            value={newSection.key}
            onChange={e => setNewSection({ ...newSection, key: e.target.value })}
            required
          />
          <select
            className="border px-2 py-1 rounded"
            value={newSection.type}
            onChange={e => setNewSection({ ...newSection, type: e.target.value as any })}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="html">HTML</option>
            <option value="json">JSON</option>
          </select>
          <input
            className="border px-2 py-1 rounded"
            placeholder="Value"
            value={newSection.value}
            onChange={e => setNewSection({ ...newSection, value: e.target.value })}
            required
          />
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={newSection.is_active}
              onChange={e => setNewSection({ ...newSection, is_active: e.target.checked })}
            />
            <span>Active</span>
          </label>
          <div className="flex space-x-2">
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
            <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => setShowAddSection(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
        {loadingSections ? (
          <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            {/* Pages Sections */}
            <h4 className="text-lg font-semibold mt-4 mb-2 text-orange-700">Pages Sections</h4>
            <table className="min-w-full mb-8 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pagesSections.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.key}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{item.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* General Sections */}
            <h4 className="text-lg font-semibold mt-4 mb-2 text-orange-700">General Sections</h4>
            <table className="min-w-full mb-8 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {generalSections.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.key}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{item.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Other Sections */}
            {otherSections.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mt-4 mb-2 text-orange-700">Other Sections</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {otherSections.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{item.section}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.key}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{item.value}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderImages = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Images</h3>
        <button
          className="flex items-center px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
          onClick={() => setShowAddImage(v => !v)}
        >
          <Plus className="w-4 h-4 mr-1" /> Add New
        </button>
      </div>
      <Modal open={showAddImage} onClose={() => setShowAddImage(false)}>
        <form className="flex flex-col space-y-2" onSubmit={handleAddImage}>
          <h4 className="text-lg font-semibold mb-2">Add New Image</h4>
          <input
            className="border px-2 py-1 rounded"
            placeholder="Image URL"
            value={newImage.url}
            onChange={e => setNewImage({ ...newImage, url: e.target.value })}
            required
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Alt text"
            value={newImage.alt}
            onChange={e => setNewImage({ ...newImage, alt: e.target.value })}
            required
          />
          <input
            className="border px-2 py-1 rounded"
            placeholder="Section"
            value={newImage.section}
            onChange={e => setNewImage({ ...newImage, section: e.target.value })}
            required
          />
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={newImage.is_active}
              onChange={e => setNewImage({ ...newImage, is_active: e.target.checked })}
            />
            <span>Active</span>
          </label>
          <div className="flex space-x-2">
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Save</button>
            <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => setShowAddImage(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
      {loadingImages ? (
        <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {images.map(img => (
                <tr key={img.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={img.url} alt={img.alt} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{img.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{img.alt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{img.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${img.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{img.is_active ? 'Active' : 'Inactive'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-[600px]">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-8">CMS</h2>
        <nav className="flex flex-col space-y-2">
          {menu.map(item => (
            <button
              key={item.key}
              onClick={() => setActiveMenu(item.key as any)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-left ${activeMenu === item.key ? 'bg-orange-100 text-orange-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {message && (
          <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{message.text}</span>
          </div>
        )}
        {activeMenu === 'pages' && renderPages()}
        {activeMenu === 'sections' && renderSections()}
        {activeMenu === 'images' && renderImages()}
        {activeMenu === 'menus' && renderMenus()}
        {activeMenu === 'builder' && renderPageBuilder()}
      </div>
    </div>
  );

  // Page Builder UI (basic prototype)
  function renderPageBuilder() {
    // Palette of available components
    const palette = [
      { type: 'heading', label: 'Heading' },
      { type: 'text', label: 'Text' },
      { type: 'image', label: 'Image' },
      { type: 'button', label: 'Button' },
    ];
    // Add component to page
    const addComponent = (type: string) => {
      setPageComponents([...pageComponents, { type, id: Date.now() }]);
    };
    // Remove component
    const removeComponent = (id: number) => {
      setPageComponents(pageComponents.filter(c => c.id !== id));
    };
    // Move component (simple up/down for now)
    const moveComponent = (from: number, to: number) => {
      if (to < 0 || to >= pageComponents.length) return;
      const updated = [...pageComponents];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      setPageComponents(updated);
    };
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Page Builder (Prototype)</h3>
        <div className="flex gap-8">
          {/* Palette */}
          <div className="w-48 bg-gray-50 rounded-lg shadow p-4">
            <h4 className="font-semibold mb-2">Components</h4>
            {palette.map((item, idx) => (
              <button
                key={item.type}
                className="w-full mb-2 px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded text-left font-medium text-orange-700"
                onClick={() => addComponent(item.type)}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Canvas */}
          <div className="flex-1 bg-white rounded-lg shadow p-6 min-h-[400px]">
            <h4 className="font-semibold mb-4 text-gray-700">Page Canvas</h4>
            {pageComponents.length === 0 && (
              <div className="text-gray-400 text-center py-12">Drag components here to build your page</div>
            )}
            {pageComponents.map((comp, idx) => (
              <div key={comp.id} className="mb-4 p-4 border rounded-lg bg-gray-50 flex items-center justify-between">
                <div>
                  {comp.type === 'heading' && <div className="text-2xl font-bold">Heading Example</div>}
                  {comp.type === 'text' && <div className="text-gray-700">Text block example</div>}
                  {comp.type === 'image' && <div className="w-32 h-20 bg-gray-200 flex items-center justify-center text-gray-400">Image</div>}
                  {comp.type === 'button' && <button className="bg-orange-500 text-white px-4 py-2 rounded">Button</button>}
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-orange-500" onClick={() => moveComponent(idx, idx-1)} title="Move Up">↑</button>
                  <button className="text-gray-400 hover:text-orange-500" onClick={() => moveComponent(idx, idx+1)} title="Move Down">↓</button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeComponent(comp.id)} title="Remove">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Menu Builder UI
  function renderMenus() {
    const headerMenus = menus.filter(m => m.location === 'header');
    const footerMenus = menus.filter(m => m.location === 'footer');
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Menu Builder</h3>
          <button
            className="flex items-center px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={() => { setShowAddMenu(true); setEditMenuId(null); setNewMenu({ location: 'header', label: '', url: '', order: 1, is_active: true }); }}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Menu Item
          </button>
        </div>
        <Modal open={showAddMenu} onClose={() => { setShowAddMenu(false); setEditMenuId(null); }}>
          <form className="flex flex-col space-y-2" onSubmit={editMenuId ? handleEditMenu : handleAddMenu}>
            <h4 className="text-lg font-semibold mb-2">{editMenuId ? 'Edit Menu Item' : 'Add Menu Item'}</h4>
            <select
              className="border px-2 py-1 rounded"
              value={newMenu.location}
              onChange={e => setNewMenu({ ...newMenu, location: e.target.value })}
            >
              <option value="header">Header</option>
              <option value="footer">Footer</option>
            </select>
            <input
              className="border px-2 py-1 rounded"
              placeholder="Label"
              value={newMenu.label}
              onChange={e => setNewMenu({ ...newMenu, label: e.target.value })}
              required
            />
            <input
              className="border px-2 py-1 rounded"
              placeholder="URL"
              value={newMenu.url}
              onChange={e => setNewMenu({ ...newMenu, url: e.target.value })}
              required
            />
            <input
              className="border px-2 py-1 rounded"
              type="number"
              min={1}
              placeholder="Order"
              value={newMenu.order}
              onChange={e => setNewMenu({ ...newMenu, order: Number(e.target.value) })}
              required
            />
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={newMenu.is_active}
                onChange={e => setNewMenu({ ...newMenu, is_active: e.target.checked })}
              />
              <span>Active</span>
            </label>
            <div className="flex space-x-2">
              <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">{editMenuId ? 'Update' : 'Save'}</button>
              <button type="button" className="bg-gray-300 px-3 py-1 rounded" onClick={() => { setShowAddMenu(false); setEditMenuId(null); }}>Cancel</button>
            </div>
          </form>
        </Modal>
        {loadingMenus ? (
          <div className="py-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <h4 className="text-lg font-semibold mt-4 mb-2 text-orange-700">Header Menu</h4>
            <table className="min-w-full mb-8 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {headerMenus.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.label}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.order}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => { setEditMenuId(item.id); setShowAddMenu(true); setNewMenu({ location: item.location, label: item.label, url: item.url, order: item.order, is_active: item.is_active }); }}><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteMenu(item.id)}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h4 className="text-lg font-semibold mt-4 mb-2 text-orange-700">Footer Menu</h4>
            <table className="min-w-full mb-8 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {footerMenus.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{item.label}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.order}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => { setEditMenuId(item.id); setShowAddMenu(true); setNewMenu({ location: item.location, label: item.label, url: item.url, order: item.order, is_active: item.is_active }); }}><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteMenu(item.id)}><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
};

export default CMSManager;
