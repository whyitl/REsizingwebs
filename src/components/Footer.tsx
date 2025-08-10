
import TextPressure from './TextPressure';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section-dark relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative pt-16 sm:pt-20 lg:pt-24 pb-[36vw] sm:pb-[32vw] md:pb-[30vw] lg:pb-[28vw]">
          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 relative z-10">
            {/* Left: Copyright + location */}
            <div className="space-y-6">
              <div className="text-white tracking-wide font-semibold">© RESIZING {currentYear}</div>
              <p className="text-lg text-white/90">Calgary, AB, Canada</p>
            </div>

            {/* Right: Links */}
            <div className="space-y-6 md:text-right">
              <div className="text-white tracking-wide font-extrabold">SAY HELLO</div>
              <div className="space-y-3">
                <a href="mailto:contact@resizing.ca" className="text-white underline underline-offset-4 hover:opacity-90">contact@resizing.ca</a>
                <div>
                  <a href="https://instagram.com/resizing" target="_blank" rel="noreferrer" className="text-white underline underline-offset-4 hover:opacity-90">Instagram</a>
                </div>
              </div>
            </div>
          </div>

          {/* Massive wordmark anchored to bottom with TextPressure effect */}
          <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 bottom-0">
            <div style={{ position: 'relative', height: '18vw', transform: 'translateY(-6vw)' }}>
              <TextPressure
                text="RESIZING"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={36}
                letterSpacing="-0.06em"
                restWeight={650}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
