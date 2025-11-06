import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'richardacheampong249@gmail.com',
      link: 'mailto:richardacheampong249@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+233 257100607',
      link: 'tel:+233257100607'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+233 538057449',
      link: 'https://wa.me/233538057449'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Greater, Accra, Ghana',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/Rich-2000',
      username: '@Rich-2000'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/richard-acheampong',
      username: '@richard-acheampong'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/Richard08845781',
      username: '@Richard08845781'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-100 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, creative ideas, 
            or opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-8">Let's Connect</h2>
            
            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              {contactMethods.map((method, index) => (
                <a
                  key={method.title}
                  href={method.link}
                  className="flex items-center p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors duration-200 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-200">
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{method.title}</div>
                    <div className="text-gray-400">{method.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Follow Me</h3>
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors duration-200 group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-200">
                        {social.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{social.name}</div>
                        <div className="text-gray-400 text-sm">{social.username}</div>
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-primary-500 transition-colors duration-200">
                      →
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-8">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map/Location Section */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-dark-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">My Location</h2>
            <div className="bg-dark-300 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-gray-400">Interactive map would go here</p>
                <p className="text-sm text-gray-500 mt-2">
                  Greater Accra, Ghana • Open to remote opportunities worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;