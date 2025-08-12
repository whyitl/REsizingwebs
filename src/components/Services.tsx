
import { Monitor, RotateCcw, ShoppingCart, FileText, Wrench, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const Services = () => {
  const services = [
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Custom Web Design",
      description: "Tailored websites built from the ground up. We guide you through every step — from discovery to launch, creating a fully custom site that reflects your brand.",
      mobileSummary: "Custom websites designed around your goals with fast, responsive layouts and clean, SEO‑ready code.",
      features: [
        "Discovery and user-first planning",
        "High‑performance responsive layouts",
        "SEO‑ready structure and clean code",
      ]
    },
    {
      icon: <RotateCcw className="w-12 h-12" />,
      title: "Website Redesign", 
      description: "Outdated site? Let's give it a fresh start. We'll analyze your current site and create a modernized version that works harder for your business — without losing your SEO.",
      mobileSummary: "Refresh your site for modern UX, speed, and conversions — without sacrificing your current SEO.",
      features: [
        "UX refresh that drives conversions",
        "Content migration without SEO loss",
        "Accessibility and speed improvements",
      ]
    },
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "Ecommerce Web Design",
      description: "Online stores that drive real results. We build ecommerce websites that look great and are easy for customers to use — designed for smooth, mobile-optimized shopping that converts.",
      mobileSummary: "Mobile‑first stores with clear product pages, smooth checkout, and analytics for growth.",
      features: [
        "Mobile‑first product pages",
        "Secure checkout and payment flows",
        "Analytics + growth tracking",
      ]
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "SEO Content Strategy",
      description: "Get found online with the right words. We offer content writing and SEO optimization to help your site rank higher on Google and drive more traffic.",
      mobileSummary: "Content and on‑page SEO that help the right people find you and convert.",
      features: [
        "Keyword research and on‑page SEO",
        "Content writing and briefs",
        "Internal linking and schema setup",
      ]
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Hosting, Support & Maintenance",
      description: "We don't disappear after launch. We offer reliable hosting, ongoing updates, and support — so you can focus on running your business.",
      mobileSummary: "Managed hosting, updates, and fast support so your site stays secure and speedy.",
      features: [
        "Managed hosting and backups",
        "Security monitoring and updates",
        "Fast support and small edits",
      ]
    }
  ];

  const isMobile = useIsMobile();

  const MobileServiceCard = ({ service, index }: { service: typeof services[number]; index: number }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => setVisible(e.isIntersecting));
        },
        { threshold: 0.15 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className={`w-[95%] mx-auto p-6 border rounded-[28px] transition-all duration-500 will-change-transform ${
          index % 2 === 0
            ? 'bg-brand-black text-brand-white border-brand-black shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
            : 'bg-brand-white text-brand-black border-brand-black'
        } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 ${index % 2 === 0 ? 'text-brand-white' : 'text-brand-black'}`}>{service.icon}</div>
          <div className="flex-1">
            <h3 className="heading-md mb-2">{service.title}</h3>
            <p className="text-base text-brand-gray leading-relaxed">{service.mobileSummary}</p>
            {service.features?.length ? (
              <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-brand-gray-dark">
                {service.features.slice(0, 2).map((feat, i) => (
                  <li key={i} className="inline-flex items-start gap-2">
                    <Check className="w-4 h-4 mt-1 flex-none" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="services" className="section-light section-padding pb-8 md:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-14">
          <h2 className="heading-lg text-brand-black mb-4">
            Our Services
          </h2>
          <p className="body-lg text-brand-gray max-w-2xl mx-auto">
            Explore our comprehensive services designed to help your business grow online.
          </p>
        </div>
        {isMobile ? (
          <div className="mt-6 space-y-8">
            {services.map((service, index) => (
              <MobileServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        ) : (
          <ScrollStack
            className="-mt-2 md:-mt-10"
            itemDistance={22}
            itemStackDistance={34}
            stackPosition="24%"
            baseScale={0.94}
          >
            {services.map((service, index) => (
              <ScrollStackItem key={index} itemClassName={`w-[95%] sm:w-[94%] md:w-[min(980px,100%)] mx-auto p-6 md:p-10 border rounded-[28px] ${index % 2 === 0 ? 'bg-brand-black text-brand-white border-brand-black shadow-[0_12px_40px_rgba(0,0,0,0.35)]' : 'bg-brand-white text-brand-black border-brand-black'}`}>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className={`service-icon flex-shrink-0 ${index % 2 === 0 ? 'text-brand-white' : 'text-brand-black'}`}>{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="heading-md mb-2 md:mb-4">{service.title}</h3>
                    <p className="text-base md:text-2xl lg:text-3xl text-brand-gray leading-relaxed">{service.description}</p>
                    {service.features?.length ? (
                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm md:text-base text-brand-gray-dark">
                        {service.features.map((feat, i) => (
                          <li key={i} className="inline-flex items-start gap-2">
                            <Check className="w-4 h-4 mt-1 flex-none" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        )}

        {/* Ensure visual breathing room after the last card on all viewports */}
        <div className="h-16 md:h-24" aria-hidden="true" />
      </div>
    </section>
  );
};

export default Services;
