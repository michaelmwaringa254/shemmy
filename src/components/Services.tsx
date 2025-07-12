import React, { useState } from 'react';
import { 
  Globe, 
  Database, 
  TrendingUp, 
  Palette, 
  ShoppingCart, 
  Search,
  ArrowRight,
  X
} from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Website Development",
      description: "Custom websites built with modern technologies for optimal performance and user experience.",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Mobile-First", "Custom Development"],
      price: "Starting from $500"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Entry",
      description: "Professional data entry services with high accuracy and quick turnaround times.",
      features: ["Data Processing", "Database Management", "Quality Assurance", "Timely Delivery", "Confidential"],
      price: "Starting from $10/hour"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to boost your online presence and sales.",
      features: ["Social Media Marketing", "Content Strategy", "Analytics", "Campaign Management", "ROI Tracking"],
      price: "Starting from $300/month"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Graphics Design",
      description: "Creative graphic design solutions for branding, marketing, and digital assets.",
      features: ["Logo Design", "Brand Identity", "Marketing Materials", "Social Media Graphics", "Print Design"],
      price: "Starting from $50"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "WordPress",
      description: "Professional WordPress development and customization services.",
      features: ["Theme Development", "Plugin Integration", "Site Migration", "Performance Optimization", "Maintenance"],
      price: "Starting from $200"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce Website",
      description: "Complete e-commerce solutions to sell your products online effectively.",
      features: ["Online Store Setup", "Payment Integration", "Inventory Management", "Order Processing", "Mobile Shopping"],
      price: "Starting from $800"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Google Ads",
      description: "Expert Google Ads management to drive targeted traffic and maximize ROI.",
      features: ["Campaign Setup", "Keyword Research", "Ad Copy Creation", "Performance Monitoring", "ROI Optimization"],
      price: "Starting from $200/month"
    }
  ];

  const handleServiceRequest = (serviceTitle: string) => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // You can add logic here to pre-fill the contact form with the selected service
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">My Services</h2>
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
                <div className="text-orange-600 font-semibold mb-4">{service.price}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedService(index)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleServiceRequest(service.title)}
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
                <div className="text-orange-600 font-semibold mb-4">
                  {services[selectedService].price}
                </div>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    handleServiceRequest(services[selectedService].title);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;