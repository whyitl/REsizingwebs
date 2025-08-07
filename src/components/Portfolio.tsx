
import { ExternalLink } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern online store with seamless user experience",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
    },
    {
      title: "Restaurant Website",
      description: "Beautiful dining experience showcase",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
    },
    {
      title: "SaaS Landing Page",
      description: "High-converting product launch page",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
    }
  ];

  return (
    <section id="portfolio" className="section-padding bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="heading-lg text-brand-black mb-6">
            Our Work
          </h2>
          <p className="body-lg text-brand-gray max-w-2xl mx-auto">
            See our work in action. Each project is crafted with attention to detail 
            and strategic thinking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="portfolio-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="portfolio-card-overlay">
                <div className="portfolio-card-content p-6">
                  <span className="text-sm font-medium text-brand-gray mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="heading-md text-brand-white mb-3">
                    {project.title}
                  </h3>
                  <p className="body-md text-brand-white mb-6">
                    {project.description}
                  </p>
                  <button className="inline-flex items-center text-brand-white border border-brand-white px-4 py-2 hover:bg-brand-white hover:text-brand-black transition-all duration-300">
                    View Project
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
