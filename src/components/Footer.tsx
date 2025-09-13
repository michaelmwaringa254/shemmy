import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSignup from './NewsletterSignup';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const ventures = [
    { name: "Acadeemia", url: "www.acadeemia.com" },
    { name: "WorkCrux", url: "www.workcrux.io" },
    { name: "WhatsClick", url: "www.whatsclick.icu" },
    { name: "TheTechsWay", url: "www.thetechsway.com" },
    { name: "ShoeFlicker", url: "www.shoeflicker.com" },
    { name: "MyRentalZone", url: "www.myrentalzone.com" },
    { name: "MyTabibu", url: "www.mytabibu.com" },
    { name: "MyStoko", url: "www.mystoko.com" }
  ];

  const serviceCategories = [
    {
      title: "Development",
      services: [
        "Website Development",
        "WordPress Development",
        "E-commerce Website",
        "Custom Software Development",
        "Mobile App Development"
      ]
    },
    {
      title: "Marketing & Design",
      services: [
        "Digital Marketing",
        "Graphics Design",
        "Google Ads Management",
        "SEO Optimization",
        "Email Marketing",
        "Social Media Management"
      ]
    },
    {
      title: "Business Solutions",
      services: [
        "Data Entry",
        "Content Creation",
        "Business Consulting",
        "System Integration"
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/assets/logos/Shemmy Logos.png" 
                alt="Shemmy Mae Logo" 
                className="w-50 h-12 object-contain"
              />
            </Link>
            <p className="text-gray-400">
              Digital Solutions & Business Development Expert transforming ideas into digital success stories.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@shemmymae.space" className="hover:text-white transition-colors">
                  info@shemmymae.space
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <a href="tel:+254745259845" className="hover:text-white transition-colors">
                  +254745259845
                </a>
              </div>
            </div>
          </div>

          {/* Service Categories */}
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-500">{category.title}</h3>
              <ul className="space-y-2">
                {category.services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to="/services"
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                 onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                 onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                 onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                 onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <NewsletterSignup variant="footer" />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            Shemmy Mae © {currentYear} . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
