import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Save, 
  Edit, 
  Trash2, 
  Plus, 
  Image, 
  Type, 
  Code, 
  FileText,
  Eye,
  EyeOff,
  Search,
  Filter,
  Upload,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

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

const CMSManager = () => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [editingItem, setEditingItem] = useState<CMSContent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [newItem, setNewItem] = useState({
    section: '',
    key: '',
    type: 'text' as const,
    value: '',
    metadata: {},
    is_active: true
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { data, error } = await supabase
        .from('cms_content')
        .select('*')
        .order('section', { ascending: true })
        .order('key', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching CMS content:', error);
      showMessage('error', 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const saveContent = async (item: CMSContent) => {
    setSaving(true);
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('cms_content')
        .update({
          value: item.value,
          metadata: item.metadata,
          is_active: item.is_active
        })
        .eq('id', item.id);

      if (error) throw error;

      setContent(prev => prev.map(c => c.id === item.id ? item : c));
      setEditingItem(null);
      showMessage('success', 'Content updated successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      showMessage('error', 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const addNewContent = async () => {
    setSaving(true);
    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { data, error } = await supabase
        .from('cms_content')
        .insert([newItem])
        .select()
        .single();

      if (error) throw error;

      setContent(prev => [...prev, data]);
      setShowAddModal(false);
      setNewItem({
        section: '',
        key: '',
        type: 'text',
        value: '',
        metadata: {},
        is_active: true
      });
      showMessage('success', 'Content added successfully');
    } catch (error) {
      console.error('Error adding content:', error);
      showMessage('error', 'Failed to add content');
    } finally {
      setSaving(false);
    }
  };

  const deleteContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('cms_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContent(prev => prev.filter(c => c.id !== id));
      showMessage('success', 'Content deleted successfully');
    } catch (error) {
      console.error('Error deleting content:', error);
      showMessage('error', 'Failed to delete content');
    }
  };

  const toggleActive = async (item: CMSContent) => {
    const updatedItem = { ...item, is_active: !item.is_active };
    await saveContent(updatedItem);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'html': return <Code className="w-4 h-4" />;
      case 'json': return <FileText className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = 
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.value.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSection = sectionFilter === 'all' || item.section === sectionFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesSection && matchesType;
  });

  const sections = [...new Set(content.map(item => item.section))];
  const types = ['text', 'image', 'html', 'json'];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">CMS Manager</h2>
          <p className="text-gray-600">Manage all website content, images, and sections</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Content</span>
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center space-x-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? 
            <CheckCircle className="w-5 h-5" /> : 
            <AlertCircle className="w-5 h-5" />
          }
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Sections</option>
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Section / Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.section}</div>
                      <div className="text-sm text-gray-500">{item.key}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span className="text-sm text-gray-900">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {item.type === 'image' ? (
                        <div className="flex items-center space-x-2">
                          <img src={item.value} alt="" className="w-8 h-8 object-cover rounded" />
                          <span>{item.value}</span>
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${
                        item.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{item.is_active ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteContent(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Content</h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section
                    </label>
                    <input
                      type="text"
                      value={editingItem.section}
                      onChange={(e) => setEditingItem({...editingItem, section: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key
                    </label>
                    <input
                      type="text"
                      value={editingItem.key}
                      onChange={(e) => setEditingItem({...editingItem, key: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Value
                  </label>
                  {editingItem.type === 'html' ? (
                    <textarea
                      value={editingItem.value}
                      onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={editingItem.value}
                      onChange={(e) => setEditingItem({...editingItem, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metadata (JSON)
                  </label>
                  <textarea
                    value={JSON.stringify(editingItem.metadata, null, 2)}
                    onChange={(e) => {
                      try {
                        const metadata = JSON.parse(e.target.value);
                        setEditingItem({...editingItem, metadata});
                      } catch (error) {
                        // Invalid JSON, don't update
                      }
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editingItem.is_active}
                    onChange={(e) => setEditingItem({...editingItem, is_active: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveContent(editingItem)}
                  disabled={saving}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Add New Content</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section *
                    </label>
                    <input
                      type="text"
                      value={newItem.section}
                      onChange={(e) => setNewItem({...newItem, section: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., hero, about, services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key *
                    </label>
                    <input
                      type="text"
                      value={newItem.key}
                      onChange={(e) => setNewItem({...newItem, key: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., title, description, image"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Value *
                  </label>
                  {newItem.type === 'html' ? (
                    <textarea
                      value={newItem.value}
                      onChange={(e) => setNewItem({...newItem, value: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                      placeholder="Enter HTML content..."
                    />
                  ) : (
                    <input
                      type="text"
                      value={newItem.value}
                      onChange={(e) => setNewItem({...newItem, value: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter content value..."
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewContent}
                  disabled={saving || !newItem.section || !newItem.key || !newItem.value}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Add Content</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSManager;