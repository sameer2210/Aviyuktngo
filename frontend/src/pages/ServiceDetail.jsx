import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, PhoneCall, Mail, Send } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const CONTACT_PHONE = '+91 8770321854';
const CONTACT_EMAIL = 'aviyuktngo@gmail.com';
const WHATSAPP_NUMBER = '918770321854';

const ServiceDetail = ({ serviceSlug }) => {
  const params = useParams();
  const slug = serviceSlug || params.slug;

  const service = useMemo(() => {
    return servicesData.find((item) => item.slug === slug);
  }, [slug]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const whatsappMessage = [
      'Hello Aviyukt NGO,',
      '',
      `Service: ${service.title}`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Message: ${formData.message}`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  if (!service) {
    return (
      <main className="min-h-screen bg-[#ebebeb] pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-serif text-[#335288] mb-3">Service Not Found</h1>
          <p className="text-gray-600 mb-6">
            The service you requested is unavailable right now. Please explore all available services.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-[#335288] text-white px-5 py-2 rounded-full hover:bg-[#274170] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const Icon = service.icon;
  const subject = encodeURIComponent(`Support request for ${service.title}`);

  return (
    <main className="min-h-screen bg-[#ebebeb] pt-28 pb-16 px-4 sm:px-6 lg:px-10">
      <section className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#2f4f83] via-[#335288] to-[#4f74aa] text-white p-8 sm:p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-12 left-6 h-44 w-44 rounded-full bg-white/10 blur-3xl" />

          <Link to="/services" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-sm uppercase tracking-[0.15em] text-white/80">Aviyukt NGO Service</p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">{service.title}</h1>
          <p className="max-w-3xl text-base sm:text-lg text-white/90">{service.detailDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-[#335288] mb-4">What We Do</h2>
            <p className="text-gray-700 leading-relaxed mb-5">{service.detailDescription}</p>

            <h3 className="text-xl font-semibold text-[#335288] mb-3">How It Works</h3>
            <p className="text-gray-700 leading-relaxed mb-5">{service.howItWorks}</p>

            <h3 className="text-xl font-semibold text-[#335288] mb-3">Benefits</h3>
            <p className="text-gray-700 leading-relaxed mb-5">{service.benefits}</p>

            <h3 className="text-xl font-semibold text-[#335288] mb-3">Key Offerings</h3>
            <ul className="space-y-3 mb-6">
              {service.offerings.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-[#335288] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {service.impact && (
              <>
                <h3 className="text-xl font-semibold text-[#335288] mb-3">Community Impact</h3>
                <p className="text-gray-700 leading-relaxed">{service.impact}</p>
              </>
            )}
          </article>

          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#335288] mb-4">Contact Section</h3>
              <div className="space-y-3 text-gray-700 mb-5">
                <p className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#335288]" />
                  {CONTACT_PHONE}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#335288]" />
                  {CONTACT_EMAIL}
                </p>
              </div>

              {/* <a
                href={`mailto:${CONTACT_EMAIL}?subject=${subject}`}
                className="w-full inline-flex justify-center items-center gap-2 bg-[#335288] text-white py-2.5 rounded-lg hover:bg-[#274170] transition-colors"
              >
                Contact Us
              </a> */}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-[#335288] mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#335288]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#335288]"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#335288]"
                />

                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center gap-2 border border-[#335288] text-[#335288] py-2.5 rounded-lg hover:bg-[#335288] hover:text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Contact Us
                </button>
              </form>

              {submitted && (
                <p className="mt-3 text-sm text-green-700 bg-green-50 rounded-md px-3 py-2">
                  WhatsApp opened with your message details. Please tap send to complete.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
