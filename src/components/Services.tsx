
import { Monitor, RotateCcw, ShoppingCart, FileText, Wrench } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const Services = () => {
  const services = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Custom Web Design",
      description: "Tailored websites built from the ground up. We guide you through every step — from discovery to launch, creating a fully custom site that reflects your brand.",
      features: []
    },
    {
      icon: <RotateCcw className="w-12 h-12" />,
      title: "Website Redesign", 
      description: "Outdated site? Let's give it a fresh start. We'll analyze your current site and create a modernized version that works harder for your business — without losing your SEO.",
      features: []
    },
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "Ecommerce Web Design",
      description: "Online stores that drive real results. We build ecommerce websites that look great and are easy for customers to use — designed for smooth, mobile-optimized shopping that converts.",
      features: []
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "SEO Content Strategy",
      description: "Get found online with the right words. We offer content writing and SEO optimization to help your site rank higher on Google and drive more traffic.",
      features: []
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Hosting, Support & Maintenance",
      description: "We don't disappear after launch. We offer reliable hosting, ongoing updates, and support — so you can focus on running your business.",
      features: []
    }
  ];

  return (
    <section id="services" className="section-light pt-8 pb-48 md:pb-64 animate-on-scroll">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-0 -mb-28 md:-mb-36 lg:-mb-44">
          <h2 className="heading-lg text-brand-black mb-4">
            Our Services
          </h2>
          <p className="body-lg text-brand-gray max-w-2xl mx-auto">
            Explore our comprehensive services designed to help your business grow online.
          </p>
        </div>
        <ScrollStack
          className="-mt-2 md:-mt-10"
          itemDistance={20}
          itemStackDistance={36}
          stackPosition="22%"
          baseScale={0.92}
        >
          {services.map((service, index) => (
            <ScrollStackItem key={index} itemClassName={`w-[98%] sm:w-[96%] md:w-[min(980px,100%)] mx-auto p-6 md:p-10 border rounded-[28px] ${index % 2 === 0 ? 'bg-brand-black text-brand-white border-brand-black shadow-[0_12px_40px_rgba(0,0,0,0.35)]' : 'bg-brand-white text-brand-black border-brand-black'}`}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className={`service-icon flex-shrink-0 ${index % 2 === 0 ? 'text-brand-white' : 'text-brand-black'}`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="heading-md mb-1 md:mb-4">{service.title}</h3>
                  {/* Mobile: ultra-short 2–3 words; Desktop: full description */}
                  <p className="text-sm text-brand-gray leading-snug md:hidden">
                    {service.title.split(/\s+/).slice(0,3).join(' ')}
                  </p>
                  <p className="hidden md:block text-brand-gray md:text-2xl lg:text-3xl md:leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default Services;
