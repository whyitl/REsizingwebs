
import { Globe, Smartphone, Shield, Palette, Wrench, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Custom Website Design",
      description: "Bespoke websites tailored to your brand and business goals."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-First Design",
      description: "Ensuring your website looks great on all devices."
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UX/UI Design",
      description: "Creating intuitive and engaging user interfaces."
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Website Maintenance",
      description: "Ongoing support to keep your website running smoothly."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Hosting & Security",
      description: "Reliable hosting solutions with top-notch security."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Developing strong brand identities and logos."
    }
  ];

  return (
    <section id="services" className="section-padding bg-brand-gray-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="heading-lg text-brand-black mb-6">
            Our Services
          </h2>
          <p className="body-lg text-brand-gray max-w-2xl mx-auto">
            Explore our services to see how we can help your business grow online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group service-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-brand-black mb-6 group-hover:text-brand-gray transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="heading-md mb-4 text-brand-black">
                {service.title}
              </h3>
              <p className="body-md text-brand-gray">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
