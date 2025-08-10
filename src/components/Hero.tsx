
import { ChevronDown } from 'lucide-react';
import BeamsSafe from './BeamsSafe';
import TextType from './TextType';
import { useState } from 'react';

const Hero = () => {
  const [titleDone, setTitleDone] = useState(false);

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
    <section id="home" className="min-h-screen flex items-center justify-center relative section-dark">
      {/* Three.js Beams Background with Safe Error Handling */}
      <div className="absolute inset-0 w-full h-full">
        <BeamsSafe 
          beamWidth={3}
          beamHeight={18}
          beamNumber={18}
          lightColor="#ffffff"
          speed={1.8}
          noiseIntensity={1.35}
          scale={0.22}
          rotation={30}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10 cv-auto" style={{ contentVisibility: 'auto', containIntrinsicSize: '800px 600px' }}>
        <div className="animate-fade-in">
          <TextType
            as="h1"
            className="heading-xl text-brand-white mb-8"
            text={["Crafting Digital Experiences That Convert"]}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor={false}
            loop={false}
            startOnVisible={true}
            onSentenceComplete={() => setTitleDone(true)}
          />

          <div className={`transition-opacity duration-500 ${titleDone ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="body-lg text-brand-white max-w-2xl mx-auto mb-12">
              Tailored web solutions for small businesses in Canada. We combine creativity with strategy to deliver digital solutions that work.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button 
                onClick={scrollToContact}
                className="btn-hero"
              >
                Get Started
              </button>
              
              <button 
                onClick={scrollToServices}
                className="inline-flex items-center text-brand-white font-medium hover:text-brand-gray transition-colors duration-300"
              >
                Explore Our Work
                <ChevronDown className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-6 h-6 text-brand-gray" />
      </div>
    </section>
  );
};

export default Hero;
