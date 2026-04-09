import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonImage from '../SkeletonImage';
import { sharedContact } from '../../data/homepageContent';

const WHATSAPP_NUMBER = '918770321854';

const CtaSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const handleChange = event => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const whatsappMessage = [
      'Hello Aviyukt NGO,',
      '',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Message: ${formData.message}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitState({
      type: 'success',
      message: 'WhatsApp opened with your message details. Please tap send to complete.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="bg-white text-black font-sans pb-4">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 py-20 pb-0">
        <div className="border-t border-gray-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row border-b border-gray-300 group overflow-hidden"
          >
            {/* Left text & form section */}
            <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col items-start bg-transparent transition-colors duration-500 group-hover:bg-gray-50/50">
              <span className="text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-16 flex items-center gap-3">
                <span className="text-gray-300">[</span>
                <span className="text-gray-900 transition-colors duration-300 hover:text-gray-500">TAKE ACTION</span>
                <span className="text-gray-300">]</span>
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter mb-8 text-black" style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                Join, Donate &amp;<br />Build Change
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-loose font-light mb-12">
                Your support helps us extend education, healthcare, women empowerment, and livelihood interventions to families who need consistent, respectful support.
              </p>

              <div className="flex flex-wrap gap-4 mb-12 w-full">
                <Link
                  to="/highlights"
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Donate Securely
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/highlights"
                  className="inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-wider border border-black text-black hover:bg-black hover:text-white transition-colors"
                >
                  Become a Member
                </Link>
              </div>



              <div className="mt-12 space-y-4 text-gray-500 font-light text-sm w-full">
                <p className="flex items-center gap-3 border-b border-gray-100 pb-2">
                  <Phone size={16} className="text-black" />
                  {sharedContact.phone}
                </p>
                <p className="flex items-center gap-3 border-b border-gray-100 pb-2">
                  <Mail size={16} className="text-black" />
                  {sharedContact.email}
                </p>
                <p className="flex items-center gap-3 pt-2">
                  <MapPin size={16} className="text-black" />
                  {sharedContact.location}
                </p>
              </div>
            </div>

            {/* Right Form section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-24 bg-gray-50 border-l border-transparent md:border-gray-200">
              <div className="w-full max-w-xl bg-white border border-gray-200 p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] transition-shadow">
                <h3 className="text-xl font-bold uppercase tracking-tight mb-6">Send a Message via WhatsApp</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full border-b border-gray-300 px-3 py-3 outline-none focus:border-black transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full border-b border-gray-300 px-3 py-3 outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={3}
                    required
                    className="w-full border-b border-gray-300 px-3 py-3 outline-none focus:border-black transition-colors resize-none mt-4"
                  />

                  <button
                    type="submit"
                    className="w-full mt-6 inline-flex justify-center items-center gap-2 border border-black text-black py-4 uppercase font-bold text-sm tracking-wider hover:bg-black hover:text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Contact via WhatsApp
                  </button>
                </form>

                {submitState.message && (
                  <p className={`mt-4 text-sm font-medium ${submitState.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {submitState.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
