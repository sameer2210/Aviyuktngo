import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkeletonImage from './SkeletonImage';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Narayan Kumar',
    role: 'Member',
    message: 'An inspiring organization with a heart for real change.',
    img: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/NaveenShrivastav_c7sa0p.jpg',
  },
  {
    name: 'Anand Chauhan',
    role: 'Donor',
    message: "Proud to be a supporter. Aviyukt's transparency is remarkable.",
    img: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/nandu_lfx39s.png',
  },
  {
    name: 'Ankesh',
    role: 'Beneficiary',
    message: 'Our lives changed because Aviyukt believed in us.',
    img: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259326/Anku_so4got.jpg',
  },
  {
    name: 'sameer khan',
    role: 'Doner',
    message: 'Joining Aviyukt was the best decision — it feels like family!',
    img: 'https://res.cloudinary.com/dc2geexnf/image/upload/v1775130745/1742237649179.jpg_c0lfze.jpg',
  },
  {
    name: 'Shukriti Shirvastava',
    role: 'Member',
    message: 'Incredible experience, true community empowerment!',
    img: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/Shukrantishrivastava_vp5dmh.jpg',
  },
];

const Reviews = () => {
  const container = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    // Title Animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      }
    );

    // Staggered Card Animation (Scale and Fade)
    const cards = gsap.utils.toArray('.review-card');
    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-[#fcfaf5] py-24 px-4 sm:px-10 lg:px-20 overflow-hidden border-t border-gray-200">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-20">
        
        {/* Left Intro Panel */}
        <div ref={titleRef} className="md:w-1/3 flex flex-col justify-center">
          <p className="uppercase tracking-[0.2em] text-xs font-bold text-gray-500 mb-4 border-l-2 border-black pl-3">
            Community Sentiment
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black font-serif uppercase tracking-tighter mb-6 leading-[1.1]">
            Words From Our People.
          </h2>
          <p className="text-gray-600 font-light text-lg leading-relaxed">
            Witness the direct impact and hear the stories from our donors, members, and the beneficiaries whose lives have been transformed through Aviyukt NGO.
          </p>
        </div>

        {/* Right Cards Grid */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className={`review-card relative bg-white border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between ${
                index % 2 === 1 ? 'sm:translate-y-8' : '' // Staggered layout visually
              }`}
            >
              {/* Massive subtle quote mark in background */}
              <div className="absolute top-4 right-4 text-8xl font-serif text-gray-100/60 select-none z-0">
                &rdquo;
              </div>

              <div className="relative z-10 mb-8">
                <p className="text-gray-900 leading-relaxed font-serif text-lg italic">
                  "{review.message}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-gray-100">
                <SkeletonImage
                  src={review.img}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide leading-none mb-1">
                    {review.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#335288] font-bold">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Reviews;
