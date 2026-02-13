import React, { useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';


const EMAILJS_SERVICE_ID  = 'service_iw1k10r';   
const EMAILJS_TEMPLATE_ID = 'template_6tsca06';  
const EMAILJS_PUBLIC_KEY  = 'eU3ZuZL7r67CTtTF3';   

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Template variables — must match the {{variable}} names in your EmailJS template
      const templateParams = {
        from_name:    form.name,
        from_email:   form.email,
        subject:      form.subject,
        message:      form.message,
        reply_to:     form.email,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        toast.success("Message sent! I'll get back to you soon. 🚀");
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Failed to send message. Please try again or reach out directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Data ─────────────────────────────────────────────────────────────────

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
      value: 'Greater Accra, Ghana',
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

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-dark-100 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, creative ideas,
            or opportunities to be part of your vision.
          </p>
        </div>

        {/* ── Two-column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
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

          {/* Right — Contact Form */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold mb-8">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg
                               focus:outline-none focus:border-primary-500 focus:ring-1
                               focus:ring-primary-500 transition-colors duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 mb-2"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg
                               focus:outline-none focus:border-primary-500 focus:ring-1
                               focus:ring-primary-500 transition-colors duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg
                             focus:outline-none focus:border-primary-500 focus:ring-1
                             focus:ring-primary-500 transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg
                             focus:outline-none focus:border-primary-500 focus:ring-1
                             focus:ring-primary-500 transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400
                           disabled:cursor-not-allowed text-white font-semibold py-4 px-6
                           rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Location / Map Card ── */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Card wrapper */}
          <div
            className="relative rounded-2xl overflow-hidden border border-dark-300
                        shadow-2xl shadow-black/40"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
            }}
          >
            {/* Subtle top-left glow */}
            <div
              className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)'
              }}
            />
            {/* Subtle bottom-right glow */}
            <div
              className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)'
              }}
            />

            {/* Card header */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 pt-6 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {/* Pulsing dot */}
                  <span className="relative flex h-3 w-3">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: '#10b981' }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-3 w-3"
                      style={{ backgroundColor: '#10b981' }}
                    />
                  </span>
                  <span className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: '#10b981' }}>
                    Available for Work
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">My Location</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Greater Accra, Ghana &nbsp;·&nbsp; Open to remote opportunities worldwide
                </p>
              </div>

              {/* Location badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white self-start sm:self-auto"
                style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span>📍</span>
                <span>Accra, GH</span>
              </div>
            </div>

            {/* Map iframe */}
            <div className="relative z-10 mx-4 sm:mx-6 mb-6 rounded-xl overflow-hidden"
                 style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              {/* Thin accent border around map */}
              <div className="absolute inset-0 rounded-xl z-10 pointer-events-none"
                   style={{ border: '1px solid rgba(255,255,255,0.10)' }} />

              <iframe
                title="Richard Acheampong — Greater Accra, Ghana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.1543785!2d-0.3187513!3d5.6037168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2ad7a85b%3A0xbed14ed8650e2dd3!2sGreater%20Accra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1707000000000!5m2!1sen!2sgh"
                width="100%"
                height="380"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Card footer — quick-info pills */}
            <div className="relative z-10 flex flex-wrap gap-3 px-6 pb-6">
              {[
                { emoji: '🌍', label: 'GMT+0 (WAT)' },
                { emoji: '✈️',  label: 'Open to relocation' },
                { emoji: '💻', label: 'Remote-first' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm text-gray-300"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;