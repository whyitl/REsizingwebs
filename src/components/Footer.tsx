
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white section-padding-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h3 className="heading-md mb-6">
            TUCN Media
          </h3>
          <p className="body-md text-gray-400 max-w-2xl mx-auto mb-8">
            Crafting digital experiences that convert. 
            Tailored web solutions for small businesses in Canada.
          </p>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">
              Home
            </a>
            <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">
              Services
            </a>
            <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors duration-300">
              Portfolio
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
              About
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
              Contact
            </a>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">
              © {currentYear} TUCN Media. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
