import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import SkeletonImage from './SkeletonImage';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_top,#172a46_0%,#070d18_50%,#050913_100%)] text-[#f3efe5] pt-16 pb-8 px-6 md:px-12 lg:px-20 border-t border-white/10">
      <div className="absolute -top-20 left-0 h-64 w-64 rounded-full bg-[#9dc3ff]/10 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#f2e4c5]/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <SkeletonImage
            src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258864/My%20Brand/logo_jo4h7x.png"
            alt="Aviyukt NGO logo"
            className="w-20 rounded-full ring-1 ring-white/30 mb-4"
          />
          <h3 className="font-serif text-2xl">Aviyukt NGO</h3>
          <p className="text-sm text-[#c8d2e6] mt-3 leading-relaxed">
            A place to serve people with dignity through education, health, livelihood, and inclusive community action.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs border border-white/25 rounded-full px-3 py-1 text-[#d8e2f6]">12A Approved</span>
            <span className="text-xs border border-white/25 rounded-full px-3 py-1 text-[#d8e2f6]">80G Approved</span>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-2xl mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#d4ddef]">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/storyline" className="hover:text-white transition-colors">About</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            </li>
            <li>
              <Link to="/plans" className="hover:text-white transition-colors">Plans</Link>
            </li>
            <li>
              <Link to="/highlights" className="hover:text-white transition-colors">Donate</Link>
            </li>
            <li>
              <Link to="/policy" className="hover:text-white transition-colors">Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-2xl mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-[#d4ddef]">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5" />
              <span>+91 8770321854</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5" />
              <span>aviyuktngo@gmail.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5" />
              <span>Bhopal, Madhya Pradesh, India</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-2xl mb-4">Follow Us</h4>
          <p className="text-sm text-[#c8d2e6] leading-relaxed">
            Stay connected with our field activities, drives, and volunteer opportunities.
          </p>
          <div className="mt-5 flex gap-3 text-lg">
            <a
              href="https://www.instagram.com/aviyukt_samaja_sevi_sansthan?utm_source=qr&igsh=NWR1c2t0ZnYwOTNi"
              className="h-10 w-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram" />
            </a>
            <a
              href="https://www.facebook.com/share/18ykXqs2ca/"
              className="h-10 w-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a
              href="http://www.youtube.com/@Aviyuktngo"
              className="h-10 w-10 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-[#c6d2ea]">
        <p>© {new Date().getFullYear()} Aviyukt NGO. All rights reserved.</p>
        <p>Serving with transparency, inclusion, and community trust.</p>
      </div>
    </footer>
  );
};

export default Footer;
