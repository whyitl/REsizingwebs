
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-white shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-denim font-bold text-brand-black">
              TUCN Media
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <button onClick={() => scrollToSection('home')} className="nav-link">
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="nav-link">
              Services
            </button>
            <button onClick={() => scrollToSection('portfolio')} className="nav-link">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-hero"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-brand-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-white border-t border-brand-gray-light">
            <nav className="px-6 py-4 space-y-4">
              <button onClick={() => scrollToSection('home')} className="block nav-link">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block nav-link">
                Services
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="block nav-link">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('about')} className="block nav-link">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="block nav-link">
                Contact
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-hero w-full mt-4"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
