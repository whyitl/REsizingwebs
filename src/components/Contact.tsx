
import { useState } from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    website: '',
    services: [] as string[],
    budget: '',
    timeline: '',
    projectDescription: '',
    referralSource: '',
    consent: false,
    uploadedFile: null as File | null
  });

  const serviceOptions = [
    'Website Design',
    'Website Redesign', 
    'E-commerce',
    'Branding / Logo',
    'Website Maintenance',
    'Other'
  ];

  const budgetOptions = [
    'Under $250',
    '$250–$500',
    '$500-$1000',
    '$1000+'
  ];

  const timelineOptions = [
    'ASAP',
    '1-2 weeks',
    '2-4 weeks', 
    '1-2 months',
    '2 months+'
  ];

  const referralOptions = [
    'Google',
    'Instagram',
    'LinkedIn',
    'Referral',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error('Please agree to be contacted by Resizing.');
      return;
    }
    // Handle form submission here
    toast.success('Thank you! We\'ll review your project details and get back to you soon.');
    setFormData({
      fullName: '',
      email: '',
      businessName: '',
      website: '',
      services: [],
      budget: '',
      timeline: '',
      projectDescription: '',
      referralSource: '',
      consent: false,
      uploadedFile: null
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'services') {
        setFormData(prev => ({
          ...prev,
          services: checkbox.checked 
            ? [...prev.services, value]
            : prev.services.filter(service => service !== value)
        }));
      } else if (name === 'consent') {
        setFormData(prev => ({
          ...prev,
          consent: checkbox.checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file
      }));
    }
  };

  return (
    <section id="contact" className="section-light pt-0 pb-20 lg:pb-32 animate-on-scroll">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Static heading (no animation) */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="heading-lg text-brand-black">Get started today</h2>
        </div>

        {/* Modern Form with Full Width Layout */}
        <div className="animate-on-scroll">
          <div className="bg-white rounded-2xl shadow-xl border border-brand-gray-light p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Two Column Layout for Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-brand-black mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="form-input-modern"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input-modern"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Business Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-brand-black mb-3">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="form-input-modern"
                    placeholder="Your business name"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-brand-black mb-3">
                    Website (if you have one)
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="form-input-modern"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {/* Services Multi-Select */}
              <div>
                <label className="block text-sm font-medium text-brand-black mb-4">
                  What services are you interested in? *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center p-3 border border-brand-gray-light rounded-lg hover:border-brand-black transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        name="services"
                        value={service}
                        checked={formData.services.includes(service)}
                        onChange={handleChange}
                        className="mr-3 h-4 w-4 text-brand-black border-brand-gray-light rounded focus:ring-brand-black"
                      />
                      <span className="text-sm text-brand-black">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-brand-black mb-3">
                    What's your budget range? *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="form-select-modern"
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-brand-black mb-3">
                    Timeline / Deadline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="form-select-modern"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((option) => {
                      const formattedLabel = option.replace(/\b([a-z])/g, (match, char) => char.toUpperCase());
                      return (
                        <option key={option} value={option}>{formattedLabel}</option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-brand-black mb-3">
                  Project Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  className="form-textarea-modern"
                  placeholder="Tell us about your project goals, your business, and any key features you need."
                  rows={5}
                />
              </div>

              {/* Referral Source and File Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="referralSource" className="block text-sm font-medium text-brand-black mb-3">
                    How did you hear about us?
                  </label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={handleChange}
                    className="form-select-modern"
                  >
                    <option value="">Select source</option>
                    {referralOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="fileUpload" className="block text-sm font-medium text-brand-black mb-3">
                    Upload Brief (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="fileUpload"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-brand-gray-light rounded-lg hover:border-brand-black transition-colors cursor-pointer"
                    >
                      <Upload className="w-5 h-5 mr-2 text-brand-gray" />
                      <span className="text-sm text-brand-gray">
                        {formData.uploadedFile ? formData.uploadedFile.name : 'Upload PDF, DOC, or TXT'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-center">
                <label className="inline-flex items-center text-sm text-brand-black">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mr-3 h-4 w-4 text-brand-black border-brand-gray-light rounded focus:ring-brand-black"
                  />
                  <span>I agree to be contacted by Resizing about my inquiry. *</span>
                </label>
              </div>
              
              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full btn-hero-modern flex items-center justify-center text-lg py-4"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
