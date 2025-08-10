

const Portfolio = () => {
  const projects = [
    {
      title: "Construction Company",
      description: "Modern website showcasing services, projects, and quotes.",
      image: "/portfolio/construction.webp",
    },
    {
      title: "DeFi Crypto App",
      description: "Crypto dashboard and DEX UI with optimized routing.",
      image: "/portfolio/defi-app.png",
    },
    {
      title: "Therapy Practice",
      description: "Calming, accessible design for a mental health clinic.",
      image: "/portfolio/therapy.webp",
    },
  ];

  return (
    <section
      id="portfolio"
      className="section-light pt-0 pb-8 mt-[-34rem] sm:mt-[-36rem] lg:mt-[-40rem] xl:mt-[-44rem] animate-on-scroll"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
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
              className="group portfolio-card animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <img 
                src={project.image}
                alt={`${project.title} website design case study`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  // If local asset fails, fall back to placeholder
                  if (!target.src.endsWith('/placeholder.svg')) {
                    target.src = '/placeholder.svg';
                  }
                }}
              />
              <div className="portfolio-card-overlay">
                <div className="portfolio-card-content p-6">
                  <h3 className="heading-md text-brand-white mb-3">
                    {project.title}
                  </h3>
                  <p className="body-md text-brand-white">
                    {project.description}
                  </p>
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
