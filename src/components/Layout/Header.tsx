import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Close menu when route changes
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="bg-dark-200 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-500">Portfolio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-500 bg-dark-300'
                    : 'text-gray-300 hover:text-white hover:bg-dark-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-sm font-medium text-green-400 hover:text-green-300 hover:bg-dark-300 transition-colors duration-200"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              ref={buttonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Main menu"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Updated Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-4" ref={menuRef}>
            <div className="bg-dark-200 rounded-lg shadow-xl border border-dark-300/50 backdrop-blur-sm animate-dropdown">
              {/* Arrow indicator */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-dark-200 border-t border-l border-dark-300/50 transform rotate-45"></div>
              
              <div className="relative z-10 p-3 min-w-[200px]">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 transform hover:scale-105 ${
                        isActive(item.href)
                          ? 'text-primary-500 bg-dark-300 shadow-inner'
                          : 'text-gray-300 hover:text-white hover:bg-dark-300'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {isAuthenticated && (
                    <>
                      <div className="border-t border-dark-300/30 my-2"></div>
                      <Link
                        to="/admin"
                        className="block px-4 py-3 rounded-md text-base font-medium text-green-400 hover:text-green-300 hover:bg-dark-300 transition-all duration-200 transform hover:scale-105"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-dark-300 transition-all duration-200 transform hover:scale-105"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;