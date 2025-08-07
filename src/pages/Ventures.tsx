import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      url: "acadeemia.com",
      description: "Educational technology platform connecting students with quality learning resources and expert tutors.",
      logo: "/assets/ventures/logo/acadeemia fav.png",
      backgroundImage: "/assets/ventures/bg-img/acadeemia-bg.jpg",
      color: "from-blue-500 to-blue-600",
      features: ["Online Learning", "Expert Tutors", "Interactive Content", "Progress Tracking"],
      details: "A comprehensive educational platform that bridges the gap between students and quality education through innovative technology solutions."
    },
    {
      name: "WorkCrux",
      url: "workcrux.io",
      description: "Professional networking and career development platform for modern professionals.",
      logo: "/assets/ventures/logo/workcrux fav.png",
      backgroundImage: "/assets/ventures/workcrux-bg.jpg",
      color: "from-purple-500 to-purple-600",
      features: ["Career Growth", "Professional Network", "Skill Development", "Job Opportunities"],
      details: "Empowering professionals to advance their careers through strategic networking and skill development opportunities."
    },
    {
      name: "WhatsClick",
      url: "whatsclick.icu",
      description: "Innovative communication and engagement platform for businesses and communities.",
      logo: "/assets/ventures/whatsclick-logo.png",
      backgroundImage: "/assets/ventures/whatsclick-bg.jpg",
      color: "from-green-500 to-green-600",
      features: ["Business Communication", "Community Engagement", "Real-time Messaging", "Analytics"],
      details: "Revolutionizing how businesses and communities communicate through innovative engagement tools and analytics."
    },
    {
      name: "TheTechsWay",
      url: "thetechsway.com",
      description: "Technology consulting and solutions provider for businesses seeking digital transformation.",
      logo: "/assets/ventures/thetechsway-logo.png",
      backgroundImage: "/assets/ventures/thetechsway-bg.jpg",
      color: "from-orange-500 to-orange-600",
      features: ["Tech Consulting", "Digital Solutions", "Business Strategy", "Implementation"],
      details: "Guiding businesses through digital transformation with expert consulting and innovative technology solutions."
    },
    {
      name: "ShoeFlicker",
      url: "shoeflicker.com",
      description: "Premium footwear marketplace connecting shoe enthusiasts with exclusive and trendy footwear collections.",
      logo: "/assets/ventures/shoeflicker-logo.png",
      backgroundImage: "/assets/ventures/shoeflicker-bg.jpg",
      color: "from-red-500 to-red-600",
      features: ["Premium Footwear", "Exclusive Collections", "Marketplace", "Trend Analytics"],
      details: "A specialized e-commerce platform for footwear enthusiasts, featuring curated collections and exclusive shoe releases."
    },
    {
      name: "MyRentalZone",
      url: "myrentalzone.com",
      description: "Comprehensive rental management platform for property owners and tenants.",
      logo: "/assets/ventures/myrentalzone-logo.png",
      backgroundImage: "/assets/ventures/myrentalzone-bg.jpg",
      color: "from-indigo-500 to-indigo-600",
      features: ["Property Management", "Tenant Portal", "Payment Processing", "Maintenance Tracking"],
      details: "Streamlining rental property management with digital solutions for landlords and tenants."
    },
    {
      name: "MyTabibu",
      url: "mytabibu.com",
      description: "Digital healthcare platform connecting patients with qualified medical professionals.",
      logo: "/assets/ventures/mytabibu-logo.png",
      backgroundImage: "/assets/ventures/mytabibu-bg.jpg",
      color: "from-pink-500 to-pink-600",
      features: ["Telemedicine", "Appointment Booking", "Health Records", "Prescription Management"],
      details: "Making healthcare accessible through digital consultations and comprehensive health management tools."
    },
    {
      name: "MyStoko",
      url: "mystoko.com",
      description: "Inventory management and stock control system for businesses of all sizes.",
      logo: "/assets/ventures/mystoko-logo.png",
      backgroundImage: "/assets/ventures/mystoko-bg.jpg",
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
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  {/* Background Image Header */}
                  <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${venture.backgroundImage})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>

                  {/* Logo positioned at bottom of image */}
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-lg p-2 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={venture.logo} 
                        alt={`${venture.name} logo`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 pt-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{venture.name}</h3>
                    <p className="text-orange-600 font-semibold mb-4">{venture.url}</p>
                    <p className="text-gray-600 mb-4 leading-relaxed">{venture.description}</p>
                    <p className="text-gray-700 mb-6 text-sm leading-relaxed">{venture.details}</p>
                    
                    <div className="space-y-3 mb-6">
                      <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {venture.features.map((feature, idx) => (
                          <span 
                            key={idx} 
                            className={`px-3 py-1 bg-gradient-to-r ${venture.color} text-white rounded-full text-xs font-medium shadow-sm`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Centered Visit Website Button */}
                    <div className="text-center pt-4 border-t border-gray-100">
                      <a 
                        href={`https://${venture.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`inline-flex items-center space-x-2 bg-gradient-to-r ${venture.color} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                      >
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Next Venture?</h2>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Let's collaborate to bring your ideas to life. With my experience in building successful ventures across multiple industries, 
                I can help you navigate the digital landscape and achieve your business goals.
              </p>
              <button 
                onClick={handleContactNavigation} 
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>Let's Discuss Your Project</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ventures;