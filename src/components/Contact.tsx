
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast.success('Thank you! We\'ll be in touch soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="heading-lg text-brand-black mb-6">
            Contact TUCN Media
          </h2>
          <p className="body-lg text-brand-gray max-w-2xl mx-auto">
            Ready to start your project? Let's talk about how we can help 
            your business grow online.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="animate-on-scroll">
            <h3 className="heading-md text-brand-black mb-8">
              Get in Touch
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-brand-gray mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Email</h4>
                  <p className="body-md text-brand-gray">hello@tucnmedia.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-brand-gray mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Phone</h4>
                  <p className="body-md text-brand-gray">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-brand-gray mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-brand-black mb-1">Location</h4>
                  <p className="body-md text-brand-gray">Toronto, Ontario, Canada</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-brand-gray-light">
              <h4 className="heading-md text-brand-black mb-4">
                Custom Pricing
              </h4>
              <p className="body-md text-brand-gray mb-6">
                We provide custom quotes based on your specific needs. 
                Our pricing is transparent, and we outline all costs upfront.
              </p>
              <button className="inline-flex items-center text-brand-black font-medium hover:text-brand-gray transition-colors duration-300">
                Request a Quote →
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-on-scroll">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-brand-black mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell us about your project..."
                  rows={5}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full btn-hero flex items-center justify-center"
              >
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
