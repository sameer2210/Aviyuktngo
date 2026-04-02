import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#ebebeb] text-black pt-16 pb-8 px-6 md:px-20 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 opacity-20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-bl from-yellow-300 via-red-400 to-pink-500 opacity-20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo and About */}
        <div>
          <img src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258864/My%20Brand/logo_jo4h7x.png" alt="Logo" className="w-24 mb-4" />
          <p className="text-gray-600 text-sm">
            Crafting experiences that leave a mark.  
            Let's make something amazing together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline underline-offset-4 transition-all">Launch</Link></li>
            <li><Link to="/storyline" className="hover:underline underline-offset-4 transition-all">Insight</Link></li>
            <li><Link to="/plans" className="hover:underline underline-offset-4 transition-all">Plans</Link></li>
            <li><Link to="/highlights" className="hover:underline underline-offset-4 transition-all">Connect</Link></li>
            <li><Link to="/Policy" className="hover:underline underline-offset-4 transition-all">Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-3">
              <Phone size={18} /> +91 8770321854
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} /> aviyuktngo@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} /> Bhopal, India
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-600 text-sm mb-4">Get the latest updates straight to your inbox.</p>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-full outline-none border border-gray-300 flex-grow text-sm bg-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-8"></div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between text-[#335288] items-center gap-6 text-sm">
        <p>&copy; {new Date().getFullYear()} Aviyuktngo. All rights reserved.</p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://www.instagram.com/aviyukt_samaja_sevi_sansthan?utm_source=qr&igsh=NWR1c2t0ZnYwOTNi "><i className="px-2.5 py-2 border-1 text-xl rounded-full text-[#335288] fa-brands fa-instagram"></i></a>
          <a href="https://www.facebook.com/share/18ykXqs2ca/"><i className="px-3 py-2 border-1 text-xl rounded-full text-[#335288] fa-brands fa-facebook-f"></i></a>
          <a href="http://www.youtube.com/@Aviyuktngo"><i className="p-2 border-1 text-xl rounded-full text-[#335288] fa-brands fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
