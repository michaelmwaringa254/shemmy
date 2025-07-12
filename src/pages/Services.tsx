import React, { useState } from 'react';
import { 
  Globe, 
  Database, 
  TrendingUp, 
  Palette, 
  ShoppingCart, 
  Search,
  ArrowRight,
  X,
  Code,
  Smartphone,
  BarChart3,
  Mail,
  Camera,
  FileText,
  Settings,
  Megaphone,
  Send,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestServiceIndex, setRequestServiceIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Website Development",
      description: "Custom websites built with modern technologies for optimal performance and user experience.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Mobile-First", "Custom Development", "CMS Integration"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Entry",
      description: "Professional data entry services with high accuracy and quick turnaround times.",
      features: ["Data Processing", "Database Management", "Quality Assurance", "Timely Delivery", "Confidential", "Excel/CSV Processing"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to boost your online presence and sales.",
      features: ["Social Media Marketing", "Content Strategy", "Analytics", "Campaign Management", "ROI Tracking", "Brand Building"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Graphics Design",
      description: "Creative graphic design solutions for branding, marketing, and digital assets.",
      features: ["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics", "Print Design", "UI/UX Design"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "WordPress Development",
      description: "Professional WordPress development and customization services.",
      features: ["Theme Development", "Plugin Integration", "Site Migration", "Performance Optimization", "Maintenance", "Security Setup"]
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce Website",
      description: "Complete e-commerce solutions to sell your products online effectively.",
      features: ["Online Store Setup", "Payment Integration", "Inventory Management", "Order Processing", "Mobile Shopping", "Analytics Dashboard"]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Google Ads Management",
      description: "Expert Google Ads management to drive targeted traffic and maximize ROI.",
      features: ["Campaign Setup", "Keyword Research", "Ad Copy Creation", "Performance Monitoring", "ROI Optimization", "Competitor Analysis"]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Software Development",
      description: "Tailored software solutions to meet your specific business requirements.",
      features: ["Web Applications", "API Development", "Database Design", "System Integration", "Cloud Solutions", "Maintenance Support"]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: ["iOS Development", "Android Development", "Cross-Platform", "App Store Deployment", "Push Notifications", "Analytics Integration"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "SEO Optimization",
      description: "Search engine optimization to improve your website's visibility and ranking.",
      features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Content Optimization", "Link Building", "Performance Tracking"]
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Marketing",
      description: "Strategic email marketing campaigns to engage customers and drive conversions.",
      features: ["Campaign Design", "List Management", "Automation", "A/B Testing", "Analytics", "Template Creation"]
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Content Creation",
      description: "High-quality content creation for websites, blogs, and social media platforms.",
      features: ["Blog Writing", "Social Media Content", "Video Scripts", "Product Descriptions", "Press Releases", "Copywriting"]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Business Consulting",
      description: "Strategic business consulting to help optimize operations and growth.",
      features: ["Business Strategy", "Process Optimization", "Digital Transformation", "Market Analysis", "Growth Planning", "Performance Metrics"]
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "System Integration",
      description: "Seamless integration of various business systems and third-party services.",
      features: ["API Integration", "CRM Setup", "Payment Systems", "Inventory Systems", "Analytics Tools", "Automation Setup"]
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Social Media Management",
      description: "Complete social media management to build your brand and engage audiences.",
      features: ["Content Planning", "Post Scheduling", "Community Management", "Influencer Outreach", "Analytics Reporting", "Brand Monitoring"]
    }
  ];

  const handleRequestService = (serviceIndex: number) => {
    setRequestServiceIndex(serviceIndex);
    setShowRequestForm(true);
    setSelectedService(null); // Close details modal if open
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Service request submitted:', {
      service: services[requestServiceIndex!].title,
      ...formData
    });
    setIsSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setShowRequestForm(false);
      setRequestServiceIndex(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        urgency: 'normal'
      });
    }, 3000);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeRequestForm = () => {
    setShowRequestForm(false);
    setRequestServiceIndex(null);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      urgency: 'normal'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">My Services</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to help your business succeed in the digital world
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6 group">
                  <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedService(index)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRequestService(index)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center space-x-1"
                    >
                      <span>Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Details Modal */}
            {selectedService !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {services[selectedService].title}
                    </h3>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-orange-500 mb-4">
                    {services[selectedService].icon}
                  </div>
                  <p className="text-gray-600 mb-4">{services[selectedService].description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
                    <ul className="space-y-1">
                      {services[selectedService].features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      handleRequestService(selectedService);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Service Request Form Modal */}
            {showRequestForm && requestServiceIndex !== null && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Request Sent!</h3>
                      <p className="text-gray-600">
                        Your service request has been submitted successfully. I'll get back to you within 24 hours!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            Request Service
                          </h3>
                          <p className="text-orange-600 font-semibold">
                            {services[requestServiceIndex].title}
                          </p>
                        </div>
                        <button
                          onClick={closeRequestForm}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="Enter your email address"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                            Project Urgency
                          </label>
                          <select
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                          >
                            <option value="normal">Normal (1-2 weeks)</option>
                            <option value="urgent">Urgent (3-5 days)</option>
                            <option value="asap">ASAP (24-48 hours)</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                            Project Details *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleFormChange}
                            required
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="Describe your project requirements, budget, timeline, and any specific needs..."
                          />
                        </div>

                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm text-orange-800">
                            <strong>Quick Response:</strong> I typically respond to service requests within 2-4 hours during business hours.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                        >
                          <span>Send Request</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Don't see exactly what you're looking for? I offer custom solutions tailored to your specific needs. 
                Let's discuss your project requirements.
              </p>
              <Link
                to="/contact"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
               onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
              >
                <span>Discuss Custom Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;