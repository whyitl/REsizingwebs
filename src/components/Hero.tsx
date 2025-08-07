
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="heading-xl text-brand-black mb-8">
            Crafting Digital<br />
            Experiences That<br />
            <span className="italic">Convert</span>
          </h1>
          
          <p className="body-lg text-brand-gray max-w-2xl mx-auto mb-12">
            Tailored web solutions for small businesses in Canada. 
            We combine creativity with strategy to deliver digital solutions that work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={scrollToContact}
              className="btn-hero"
            >
              Get Started
            </button>
            
            <button 
              onClick={scrollToServices}
              className="inline-flex items-center text-brand-black font-medium hover:text-brand-gray transition-colors duration-300"
            >
              Explore Our Work
              <ChevronDown className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-brand-gray" />
      </div>
    </section>
  );
};

export default Hero;
