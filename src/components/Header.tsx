
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = 0;
      const fadeEnd = windowHeight * 0.3; // Fade out by 30% of viewport height
      
      if (scrollPosition <= fadeStart) {
        setScrollOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setScrollOpacity(0);
      } else {
        const fadeProgress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setScrollOpacity(1 - fadeProgress);
      }
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
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      style={{ opacity: scrollOpacity }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              aria-label="Resizing home"
            >
              <span className="text-2xl md:text-3xl font-denim font-bold text-brand-white tracking-wide drop-shadow-lg select-none">
                RESIZING
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="nav-link-transparent"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              className="nav-link-transparent"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
              className="nav-link-transparent"
            >
              Portfolio
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="nav-link-transparent"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="nav-link-transparent"
            >
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="btn-hero-transparent"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-brand-white drop-shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-white border-t border-brand-gray-light">
            <nav className="px-6 py-4 space-y-4">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="block nav-link">
                Home
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="block nav-link">
                Services
              </a>
              <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }} className="block nav-link">
                Portfolio
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="block nav-link">
                About
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="block nav-link">
                Contact
              </a>
              <a 
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="btn-hero w-full mt-4"
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
