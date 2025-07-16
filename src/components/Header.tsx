import React, { useState } from 'react';
import { Menu, X, Mail, Phone, LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    closeMenu();
    navigate(path);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/shemmy landscape logo.png" 
              alt="Shemmy Mae Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-800">Shemmy Mae</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/about')}
              className={`transition-colors ${isActive('/about') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('/services')}
              className={`transition-colors ${isActive('/services') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavigation('/ventures')}
              className={`transition-colors ${isActive('/ventures') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Ventures
            </button>
            <button
              onClick={() => handleNavigation('/contact')}
              className={`transition-colors ${isActive('/contact') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Contact
            </button>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <a href="mailto:info@shemmymae.space" className="hover:text-orange-500 transition-colors">
                info@shemmymae.space
              </a>
            </div>
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <a href="tel:+254745259845" className="hover:text-orange-500 transition-colors">
                +254745259845
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => handleNavigation('/about')}
                className={`text-left transition-colors ${isActive('/about') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigation('/services')}
                className={`text-left transition-colors ${isActive('/services') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation('/ventures')}
                className={`text-left transition-colors ${isActive('/ventures') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
              >
                Ventures
              </button>
              <button
                onClick={() => handleNavigation('/contact')}
                className={`text-left transition-colors ${isActive('/contact') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
              >
                Contact
              </button>
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                onClick={closeMenu}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex items-center space-x-1 mb-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@shemmymae.space" className="hover:text-orange-500 transition-colors">
                  info@shemmymae.space
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <a href="tel:+254745259845" className="hover:text-orange-500 transition-colors">
                  +254745259845
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;