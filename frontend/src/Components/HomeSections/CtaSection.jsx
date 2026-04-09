import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from '../../instant/axios';
import { sharedContact } from '../../data/homepageContent';
import { reveal, stagger } from './motion';

const CtaSection = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const handleChange = event => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await axios.post('/contact/email', formData);
      setSubmitState({
        type: 'success',
        message: 'Thank you. We will connect with you shortly.',
      });
      setFormData({ email: '' });
    } catch {
      setSubmitState({
        type: 'error',
        message: 'Unable to submit right now. Please try again.',
      });
    }
  };

  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top,#13203a_0%,#050a15_68%)]">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-6"
      >
        <motion.article variants={reveal} className="glass-card soft-shadow rounded-3xl p-7 md:p-9">
          <p className="uppercase tracking-[0.24em] text-xs text-[#aab6ce]">Take Action</p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#f5f1e8] mt-3">Join, Donate, and Build Change</h2>
          <p className="mt-5 text-[#d1d9eb] leading-relaxed max-w-2xl">
            Your support helps us extend education, healthcare, women empowerment, and livelihood interventions to families who need consistent, respectful support.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/highlights"
              className="luminous-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Donate Securely
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/highlights"
              className="inline-flex items-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-[#eef2fb] hover:bg-white/10 transition-colors"
            >
              Become a Member
            </Link>
          </div>

          <div className="mt-8 space-y-3 text-[#d4ddef]">
            <p className="inline-flex items-center gap-2">
              <Phone size={16} />
              {sharedContact.phone}
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail size={16} />
              {sharedContact.email}
            </p>
            <p className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {sharedContact.location}
            </p>
          </div>
        </motion.article>

        <motion.article variants={reveal} className="glass-card rounded-3xl p-7 md:p-9 soft-shadow">
          <h3 className="font-serif text-3xl text-[#f4f0e7]">Stay Connected</h3>
          <p className="mt-3 text-[#ccd6ea]">Share your email and our team will reach out with updates and opportunities.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 outline-none text-[#f0efe9] placeholder:text-[#b6c2dd] focus:border-[#c2d7ff]"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="luminous-btn w-full rounded-xl px-4 py-3 text-sm font-semibold">
              Submit
            </button>
            {submitState.message && (
              <p
                className={`text-sm ${
                  submitState.type === 'success' ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {submitState.message}
              </p>
            )}
          </form>
        </motion.article>
      </motion.div>
    </section>
  );
};

export default CtaSection;
