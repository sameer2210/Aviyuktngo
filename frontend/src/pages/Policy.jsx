import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, LockKeyhole, Cookie, UserRoundCog, MailQuestion } from "lucide-react";

const sections = [
  {
    title: "Terms & Conditions",
    icon: <ShieldCheck className="w-6 h-6 text-[#6D28D9]" />,
    content: `By accessing our site, you agree to abide by Aviyukt NGO's terms and all applicable laws. All content, trademarks, and materials are protected under intellectual property laws.`,
  },
  {
    title: "Privacy Commitment",
    icon: <LockKeyhole className="w-6 h-6 text-[#1D4ED8]" />,
    content: `We take your privacy seriously. Your data (name, email, contact, donations) is securely processed and used strictly for necessary communication and impact reporting.`,
  },
  {
    title: "Cookie Usage",
    icon: <Cookie className="w-6 h-6 text-[#F59E0B]" />,
    content: `Our site uses cookies to enhance experience and monitor traffic. You can control cookies in your browser settings at any time.`,
  },
  {
    title: "Your Rights",
    icon: <UserRoundCog className="w-6 h-6 text-[#059669]" />,
    content: `Under GDPR and Indian laws, you have the right to access, update, or delete your data, object to processing, and request a copy of your stored information.`,
  },
  {
    title: "Contact & Queries",
    icon: <MailQuestion className="w-6 h-6 text-[#DC2626]" />,
    content: `Have concerns about data usage or legal terms? Contact us at contact@aviyuktngo.org or visit www.aviyuktngo.org for real-time support.`,
  },
];

export default function Policy() {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-tr from-[#335288] to-[#2c3e50] py-24 px-6 md:px-10 text-white text-center shadow-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4">
            Legal, Privacy & Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-gray-200">
            Your trust matters. Here’s how we protect your data, respect your rights, and stay compliant.
          </p>
        </motion.div>

        {/* Glassy Background Circles */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-400/10 rounded-full blur-3xl animate-ping" />
      </div>

      {/* Sections */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="bg-white backdrop-blur-md border border-gray-100 shadow-xl rounded-2xl p-6 relative hover:shadow-2xl transition-all group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition">
              {section.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-600 text-base leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer Certificate Styled */}
      <div className="text-center py-16 border-t border-gray-200 bg-white shadow-inner relative overflow-hidden">
        <motion.img
          src="../src/assets/logo.png"
          alt="Aviyukt NGO"
          className="mx-auto w-24 h-auto mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
          Aviyukt NGO – Empowering Change with Trust
        </h3>
        <p className="text-gray-500 mt-2">© {new Date().getFullYear()} All Rights Reserved.</p>

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full blur-3xl opacity-30" />
      </div>
    </div>
  );
}
