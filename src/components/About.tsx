import { useRef } from 'react';
import VariableProximity from './VariableProximity';
import ScrambledText from './ScrambledText';

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <section id="about" className="section-light py-24 animate-on-scroll">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column - Main Heading & Intro */}
          <div className="lg:col-span-5 animate-on-scroll animate">
            <h2 className="heading-lg text-brand-black mb-6">
              <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
                <VariableProximity
                  label={'Welcome to the'}
                  className={''}
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={containerRef as unknown as React.RefObject<HTMLElement>}
                  radius={100}
                  falloff={'linear'}
                />
                <br />
                <span className="italic">
                  <VariableProximity
                    label={'Digital Universe'}
                    className={''}
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={containerRef as unknown as React.RefObject<HTMLElement>}
                    radius={100}
                    falloff={'linear'}
                  />
                </span>
              </div>
            </h2>
            
            {/* Mission Tagline */}
            <p className="text-lg italic text-brand-gray-dark mb-10 border-l-2 border-brand-black pl-6">
              "Built to help small businesses punch above their weight online."
            </p>
            
            {/* Main Intro - Larger Typography */}
            <div className="animate-on-scroll animate" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl font-medium text-brand-black leading-relaxed mb-8">
                At Resizing, we specialize in creating custom websites that not only 
                look great but also drive results. Our approach combines creativity with 
                strategy to deliver digital solutions that work.
              </p>
            </div>

            {/* Micro-Stats */}
            <div className="animate-on-scroll animate grid grid-cols-3 gap-6 pt-8 border-t border-brand-gray-light" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-black">50+</div>
                <div className="text-sm text-brand-gray">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-black">Calgary</div>
                <div className="text-sm text-brand-gray">Based</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-black">1-on-1</div>
                <div className="text-sm text-brand-gray">Creative Direction</div>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="h-full w-px bg-brand-gray-light mx-auto"></div>
          </div>

          {/* Right Column - Supporting Content */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Supporting Paragraphs */}
            <div className="animate-on-scroll animate" style={{ animationDelay: '0.3s' }}>
              <ScrambledText
                className="body-lg text-brand-gray leading-relaxed mb-8"
                radius={50}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                {`Founded with the goal of helping small businesses succeed online, Resizing combines design expertise with a passion for technology to deliver exceptional digital experiences.`}
              </ScrambledText>

              <ScrambledText
                className="body-md text-brand-gray-dark leading-relaxed italic"
                radius={50}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                {`We're a team of earth-based creatives whose purpose is to unstick what's stuck, solve for x, and transform brilliant ideas into brands that can't be ignored.`}
              </ScrambledText>
            </div>

            {/* Enhanced "What we do" Card */}
            <div className="animate-on-scroll animate" style={{ animationDelay: '0.5s' }}>
              <div className="bg-brand-black p-8 text-brand-white shadow-2xl border border-gray-800 hover:shadow-3xl transition-all duration-300">
                <h3 className="heading-md mb-6">
                  What we do
                </h3>
                <div className="space-y-3 body-md">
                  <div className="hover:text-brand-gray transition-colors duration-200 cursor-pointer">
                    Strategy & Planning
                  </div>
                  <div className="hover:text-brand-gray transition-colors duration-200 cursor-pointer">
                    Custom Web Design
                  </div>
                  <div className="hover:text-brand-gray transition-colors duration-200 cursor-pointer">
                    Brand Development
                  </div>
                  <div className="hover:text-brand-gray transition-colors duration-200 cursor-pointer">
                    Digital Marketing
                  </div>
                  <div className="hover:text-brand-gray transition-colors duration-200 cursor-pointer">
                    Ongoing Support
                  </div>
                </div>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-8 inline-flex items-center text-brand-white border border-brand-white px-6 py-3 hover:bg-brand-white hover:text-brand-black transition-all duration-300 group"
                >
                  Get Started 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
