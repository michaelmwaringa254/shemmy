import React, { useState, useMemo } from 'react';
import { ArrowRight, Filter, Search, Download, Eye } from 'lucide-react';

interface DesignItem {
  id: string;
  title: string;
  description: string;
  category: 'poster' | 'template' | 'image' | 'branding' | 'social-media' | 'other';
  image: string;
  thumbnail: string;
  client?: string;
  year: number;
  tools?: string[];
}

const DesignProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);

  const designItems: DesignItem[] = [
    {
      id: '1',
      title: 'E-Commerce Brand Guidelines',
      description: 'Complete branding package including logo variations, color palette, and typography system for a modern e-commerce platform.',
      category: 'branding',
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      client: 'Tech Startup Inc',
      year: 2024,
      tools: ['Adobe Illustrator', 'Figma', 'Adobe InDesign']
    },
    {
      id: '2',
      title: 'Social Media Campaign',
      description: 'Cohesive social media design set including Instagram posts, Stories, and Twitter headers with consistent branding.',
      category: 'social-media',
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400',
      client: 'Marketing Agency',
      year: 2024,
      tools: ['Canva Pro', 'Adobe Photoshop']
    },
    {
      id: '3',
      title: 'Product Poster Series',
      description: 'Eye-catching product posters designed for retail and online promotion featuring modern typography and vibrant colors.',
      category: 'poster',
      image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=400',
      client: 'E-Commerce Store',
      year: 2024,
      tools: ['Adobe Illustrator', 'Adobe Photoshop']
    },
    {
      id: '4',
      title: 'Newsletter Template',
      description: 'Professional email newsletter template with responsive design, perfect for marketing campaigns and updates.',
      category: 'template',
      image: 'https://images.pexels.com/photos/8726637/pexels-photo-8726637.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/8726637/pexels-photo-8726637.jpeg?auto=compress&cs=tinysrgb&w=400',
      client: 'SaaS Company',
      year: 2024,
      tools: ['HTML/CSS', 'Adobe Dreamweaver']
    },
    {
      id: '5',
      title: 'Website UI Kit',
      description: 'Complete UI kit with components, buttons, forms, and navigation elements for modern web applications.',
      category: 'template',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      client: 'Web Design Studio',
      year: 2023,
      tools: ['Figma', 'Adobe XD']
    },
    {
      id: '6',
      title: 'Corporate Presentation',
      description: 'Professional business presentation deck with cohesive design, animations, and data visualization layouts.',
      category: 'template',
      image: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=400',
      client: 'Corporate Client',
      year: 2023,
      tools: ['PowerPoint', 'Adobe Illustrator']
    },
    {
      id: '7',
      title: 'Banner Design Collection',
      description: 'Versatile banner designs for websites, perfect for promotional campaigns, seasonal sales, and announcements.',
      category: 'image',
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
      client: 'Online Retailer',
      year: 2023,
      tools: ['Photoshop', 'Figma']
    },
    {
      id: '8',
      title: 'Logo Variations',
      description: 'Multiple logo variations and applications showing versatility across different mediums and sizes.',
      category: 'branding',
      image: 'https://images.pexels.com/photos/3823517/pexels-photo-3823517.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/3823517/pexels-photo-3823517.jpeg?auto=compress&cs=tinysrgb&w=400',
      client: 'Startup Brand',
      year: 2023,
      tools: ['Adobe Illustrator', 'Figma']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Designs' },
    { value: 'branding', label: 'Branding' },
    { value: 'poster', label: 'Posters' },
    { value: 'template', label: 'Templates' },
    { value: 'image', label: 'Images' },
    { value: 'social-media', label: 'Social Media' }
  ];

  const filteredDesigns = useMemo(() => {
    return designItems.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.client && item.client.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Design Projects</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore my collection of creative design work including posters, templates, branding, and digital assets
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="flex-1 md:flex-none relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredDesigns.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No designs found matching your criteria</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing {filteredDesigns.length} of {designItems.length} designs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedDesign(design)}
                  >
                    <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-gray-100 aspect-video">
                      <img
                        src={design.thumbnail}
                        alt={design.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {categories.find(c => c.value === design.category)?.label}
                        </span>
                        <span className="text-xs text-gray-500">{design.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
                        {design.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {design.description}
                      </p>
                      {design.client && (
                        <p className="text-xs text-gray-500 mt-2">
                          Client: <span className="font-medium">{design.client}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 flex justify-between items-center p-6">
              <h2 className="text-2xl font-bold text-gray-800">{selectedDesign.title}</h2>
              <button
                onClick={() => setSelectedDesign(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={selectedDesign.image}
                  alt={selectedDesign.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Overview</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedDesign.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Category</label>
                      <p className="text-gray-900">
                        {categories.find(c => c.value === selectedDesign.category)?.label}
                      </p>
                    </div>
                    {selectedDesign.client && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Client</label>
                        <p className="text-gray-900">{selectedDesign.client}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Year</label>
                      <p className="text-gray-900">{selectedDesign.year}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Details</h3>
                  {selectedDesign.tools && selectedDesign.tools.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-3 block">Tools Used</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedDesign.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Request High Resolution</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Custom Design Work?</h2>
            <p className="text-orange-100 text-lg mb-8">
              Let's collaborate on your next design project. Contact me to discuss your creative vision.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignProjects;
