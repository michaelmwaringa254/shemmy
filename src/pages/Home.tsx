import React from 'react';
import { ArrowRight, Globe, User, Briefcase, Building, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NewsletterSignup from '../components/NewsletterSignup';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };
  const pages = [
    {
      title: "About Me",
      path: "/about",
      icon: <User className="w-8 h-8" />,
      description: "Learn about my journey as a digital solutions expert and entrepreneur with a passion for innovation.",
      highlights: ["My Story", "Core Values", "Professional Background"]
    },
    {
      title: "Services",
      path: "/services",
      icon: <Briefcase className="w-8 h-8" />,
      description: "Comprehensive digital solutions including website development, marketing, and business growth strategies.",
      highlights: ["Website Development", "Digital Marketing", "Graphics Design", "E-commerce Solutions"]
    },
    {
      title: "My Ventures",
      path: "/ventures",
      icon: <Building className="w-8 h-8" />,
      description: "Explore my successful ventures and projects that demonstrate my ability to build and scale digital products.",
      highlights: ["Acadeemia", "WorkCrux", "WhatsClick", "TheTechsWay"]
    },
    {
      title: "Contact",
      path: "/contact",
      icon: <Mail className="w-8 h-8" />,
      description: "Ready to start your project? Get in touch to discuss how I can help bring your vision to life.",
      highlights: ["Project Consultation", "Service Requests", "Direct Communication"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              {/* Professional Image - Left Side */}
              <div className="order-2 lg:order-1 lg:col-span-2 flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
                  <div className="relative">
                    <img 
                      src="/clothes-swap-result.png" 
                      alt="Shemmy Mae - Professional Portrait" 
                      className="w-96 h-[28rem] object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-fade-in-up"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>

              {/* Content - Right Side */}
              <div className="order-1 lg:order-2 lg:col-span-3 text-center lg:text-left space-y-6">
                
                <div className="space-y-4 animate-fade-in-right">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                    <span className="block animate-slide-in-right">Shemmy</span>
                    <span className="block text-orange-500 animate-slide-in-right animation-delay-200">Mae</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 animate-fade-in-up animation-delay-400">
                    Digital Solutions & Business Development Expert
                  </p>
                  <p className="text-lg text-gray-500 animate-fade-in-up animation-delay-600">
                    Transforming ideas into digital success stories
                  </p>
                </div>

                <div className="animate-fade-in-up animation-delay-800">
                  <p className="text-lg text-gray-700 max-w-xl leading-relaxed mb-8">
                    With a passion for innovation and a track record of successful ventures, I specialize in 
                    website development, digital marketing, and business solutions. Let's bring your vision to life.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-1000">
                  <Link
                    to="/services"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>View My Services</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span>Get In Touch</span>
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-fade-in-up animation-delay-1200">
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-orange-500 mb-2 animate-counter">8+</div>
                <p className="text-gray-600">Active Ventures</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-orange-500 mb-2 animate-counter">15+</div>
                <p className="text-gray-600">Core Services</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-orange-500 mb-2 animate-counter">100%</div>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore My Portfolio</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover my expertise, ventures, and how I can help transform your digital presence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pages.map((page, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-8 group">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="text-orange-500 group-hover:scale-110 transition-transform">
                      {page.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{page.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{page.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">What you'll find:</h4>
                    <ul className="space-y-2">
                      {page.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-gray-600">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={page.path}
                    className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors group-hover:shadow-md"
                   onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <NewsletterSignup variant="inline" />
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-orange-100 text-lg mb-8">
              Let's discuss your project and explore how my expertise can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
               onClick={() => setTimeout(() => window.scrollTo(0, 0), 100)}
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:info@shemmymae.space"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Email Me Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;