import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/servicesData';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const container = useRef();
  const headerRef = useRef();
  const gridRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    const cards = gsap.utils.toArray('.service-item');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: container });

  return (
    <main ref={container} className="min-h-screen bg-[#fafafa] pt-20">
      {/* Editorial Hero Header */}
      <section className="bg-white text-black min-h-[40vh] flex flex-col justify-center px-4 sm:px-6 lg:px-12 border-b border-black">
        <div ref={headerRef} className="max-w-[90rem] mx-auto w-full py-20 pb-12">
          <p className="uppercase tracking-[0.2em] text-xs font-semibold text-gray-500 mb-6 flex items-center gap-4">
            <span className="w-10 h-[1px] bg-black"></span> AVIYUKT NGO SERVICES
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] font-serif uppercase tracking-tighter mb-8 leading-[0.9]">
            Our Work
          </h1>
          <p className="max-w-3xl text-gray-700 text-lg md:text-xl leading-relaxed font-light">
            Actionable support across health, education, legal navigation, and rural agriculture—empowering Indian families with dignity and precision.
          </p>
        </div>
      </section>

      {/* 3x3 Full Bleed Grid - Text ON Image (Editorial Awwwards Style) */}
      <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="service-item relative group overflow-hidden bg-black aspect-[4/5] sm:aspect-[3/4] cursor-pointer"
              >
                {/* Background Image completely filling the card */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[1.5s] ease-out group-hover:scale-105 filter saturate-[0.85] group-hover:saturate-100"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:from-black/80" />

                {/* Top Header details inside image */}
                <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-white/90">
                  <div className="flex items-center justify-center w-10 h-10 border border-white/30 rounded-full backdrop-blur-md">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">
                    No. 0{index + 1}
                  </span>
                </div>

                {/* Bottom Content overlaid on image */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col justify-end transition-transform duration-500 ease-out translate-y-4 group-hover:translate-y-0">
                  <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif text-white leading-none mb-4 uppercase tracking-tighter shadow-sm">
                    {service.title}
                  </h2>
                  
                  {/* Pushes up on hover */}
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-3 font-light mb-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out delay-100">
                      {service.shortDescription}
                    </p>
                    
                    <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] group-hover:text-amber-200 transition-colors">
                      Discover
                      <ArrowRight className="w-4 h-4 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                    </div>
                  </div>
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
