import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const Services = () => {
  return (
    <main className="min-h-screen bg-[#ebebeb] pt-28 pb-16 px-4 sm:px-6 lg:px-10">
      <section className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2f4f83] via-[#335288] to-[#4f74aa] text-white p-8 sm:p-10 mb-10">
          <div className="absolute -top-10 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

          <p className="uppercase tracking-[0.2em] text-sm text-white/80 mb-2">
            Aviyukt NGO
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">Our Services</h1>
          <p className="max-w-3xl text-white/90 text-base sm:text-lg leading-relaxed">
            We offer community-centered support across health, education, legal guidance, and livelihood services so
            families can move forward with dignity, clarity, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#335288]/10 text-[#335288] flex items-center justify-center mb-4 group-hover:bg-[#335288] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#1f3558] mb-2 leading-snug">{service.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.shortDescription}</p>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-[#335288] font-medium">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Services;

