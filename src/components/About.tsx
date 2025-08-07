
const About = () => {
  return (
    <section id="about" className="section-padding bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <h2 className="heading-lg text-brand-black mb-8">
              Welcome to the<br />
              <span className="italic">Digital Universe</span>
            </h2>
            
            <div className="space-y-6">
              <p className="body-lg text-brand-gray">
                At TUCN Media, we specialize in creating custom websites that not only 
                look great but also drive results. Our approach combines creativity with 
                strategy to deliver digital solutions that work.
              </p>
              
              <p className="body-md text-brand-gray">
                Founded with the goal of helping small businesses succeed online, 
                TUCN Media combines design expertise with a passion for technology 
                to deliver exceptional digital experiences.
              </p>
              
              <p className="body-md text-brand-gray">
                We're a team of earth-based creatives whose purpose is to unstick 
                what's stuck, solve for x, and transform brilliant ideas into brands 
                that can't be ignored.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="heading-md text-brand-black mb-2">Strategy</h3>
                <p className="body-md text-brand-gray">Data-driven approach</p>
              </div>
              <div>
                <h3 className="heading-md text-brand-black mb-2">Identity</h3>
                <p className="body-md text-brand-gray">Memorable brand design</p>
              </div>
              <div>
                <h3 className="heading-md text-brand-black mb-2">Web Design</h3>
                <p className="body-md text-brand-gray">Conversion-focused</p>
              </div>
              <div>
                <h3 className="heading-md text-brand-black mb-2">Support</h3>
                <p className="body-md text-brand-gray">Ongoing maintenance</p>
              </div>
            </div>
          </div>

          <div className="animate-on-scroll lg:pl-12">
            <div className="bg-brand-black p-12 text-brand-white">
              <h3 className="heading-md mb-6">
                What we do
              </h3>
              <div className="space-y-4 body-md">
                <p>Strategy, Identity, Packaging,</p>
                <p>Story Boards, F Web Design,</p>
                <p>Brand Activation</p>
              </div>
              <button className="mt-8 inline-flex items-center text-brand-white border border-brand-white px-6 py-3 hover:bg-brand-white hover:text-brand-black transition-all duration-300">
                Our Studio →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
