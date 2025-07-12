import React from 'react';
import { ExternalLink, Users, TrendingUp, Globe, ShoppingBag, Home, Heart, Package } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Ventures = () => {
  const navigate = useNavigate();

  const handleContactNavigation = () => {
    navigate('/contact');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };
  const ventures = [
    {
      name: "Acadeemia",
      url: "www.acadeemia.com",
      description: "Educational technology platform connecting students with quality learning resources and expert tutors.",
      icon: <Users className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      features: ["Online Learning", "Expert Tutors", "Interactive Content", "Progress Tracking"],
      details: "A comprehensive educational platform that bridges the gap between students and quality education through innovative technology solutions."
    },
    {
      name: "WorkCrux",
      url: "www.workcrux.io",
      description: "Professional networking and career development platform for modern professionals.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      features: ["Career Growth", "Professional Network", "Skill Development", "Job Opportunities"],
      details: "Empowering professionals to advance their careers through strategic networking and skill development opportunities."
    },
    {
      name: "WhatsClick",
      url: "www.whatsclick.icu",
      description: "Innovative communication and engagement platform for businesses and communities.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      features: ["Business Communication", "Community Engagement", "Real-time Messaging", "Analytics"],
      details: "Revolutionizing how businesses and communities communicate through innovative engagement tools and analytics."
    },
    {
      name: "TheTechsWay",
      url: "www.thetechsway.com",
      description: "Technology consulting and solutions provider for businesses seeking digital transformation.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      features: ["Tech Consulting", "Digital Solutions", "Business Strategy", "Implementation"],
      details: "Guiding businesses through digital transformation with expert consulting and innovative technology solutions."
    },
    {
      name: "ShoeFlicker",
      url: "www.shoeflicker.com",
      description: "Premium footwear marketplace connecting shoe enthusiasts with exclusive and trendy footwear collections.",
      icon: <ShoppingBag className="w-8 h-8" />,
      color: "from-red-500 to-red-600",
      features: ["Premium Footwear", "Exclusive Collections", "Marketplace", "Trend Analytics"],
      details: "A specialized e-commerce platform for footwear enthusiasts, featuring curated collections and exclusive shoe releases."
    },
    {
      name: "MyRentalZone",
      url: "www.myrentalzone.com",
      description: "Comprehensive rental management platform for property owners and tenants.",
      icon: <Home className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600",
      features: ["Property Management", "Tenant Portal", "Payment Processing", "Maintenance Tracking"],
      details: "Streamlining rental property management with digital solutions for landlords and tenants."
    },
    {
      name: "MyTabibu",
      url: "www.mytabibu.com",
      description: "Digital healthcare platform connecting patients with qualified medical professionals.",
      icon: <Heart className="w-8 h-8" />,
      color: "from-pink-500 to-pink-600",
      features: ["Telemedicine", "Appointment Booking", "Health Records", "Prescription Management"],
      details: "Making healthcare accessible through digital consultations and comprehensive health management tools."
    },
    {
      name: "MyStoko",
      url: "www.mystoko.com",
      description: "Inventory management and stock control system for businesses of all sizes.",
      icon: <Package className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600",
      features: ["Inventory Tracking", "Stock Alerts", "Sales Analytics", "Multi-location Support"],
      details: "Comprehensive inventory management solution helping businesses optimize their stock control and operations."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">My Ventures</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Successful ventures that demonstrate my ability to build and scale digital products across various industries
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {ventures.map((venture, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow group">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${venture.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {venture.icon}
                    </div>
                    <a
                      href={`https://${venture.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{venture.name}</h3>
                  <p className="text-orange-600 font-semibold mb-4">{venture.url}</p>
                  <p className="text-gray-600 mb-4 leading-relaxed">{venture.description}</p>
                  <p className="text-gray-700 mb-6 text-sm leading-relaxed">{venture.details}</p>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {venture.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <a
                      href={`https://${venture.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Metrics */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Venture Success Metrics</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  These ventures showcase my ability to identify opportunities, build solutions, and scale businesses successfully across diverse industries.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">8</div>
                  <p className="text-gray-300">Active Ventures</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                  <p className="text-gray-300">Success Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
                  <p className="text-gray-300">Years Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500 mb-2">5000+</div>
                  <p className="text-gray-300">Users Served</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Next Venture?</h2>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Let's collaborate to bring your ideas to life. With my experience in building successful ventures across multiple industries, 
                I can help you navigate the digital landscape and achieve your business goals.
              </p>
              <Link
                to="/contact"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
               onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
              >
                <span>Let's Discuss Your Project</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ventures;