import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SkeletonImage from './SkeletonImage';

const slides = [
  {
    bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
    heading: 'Promote Education',
    description: 'In Bhopal we provide learning support and mentorship to children.',
    light: '250+ Children',
    follow: 'Follow us on',
    image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/education_dz4dcf.png',
  },
  {
    bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
    heading: 'Environment Conservation',
    description: 'We have planted more than 1150 trees for a greener tomorrow.',
    light: '1150+ Plants',
    follow: 'Follow us on',
    image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo12_i7kftb.jpg',
  },
  {
    bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
    heading: 'Women Empowerment',
    description: 'We support women with awareness, rights, and livelihood opportunities.',
    light: '12+ Meetings',
    follow: 'Follow us on',
    image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo2_xov8qg.jpg',
  },
  {
    bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
    heading: 'Health Campaign',
    description: 'We run campaigns on HIV, AIDS, Malaria, Dengue, and community health.',
    light: '25+ Camps',
    follow: 'Follow us on',
    image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo3_kduras.jpg',
  },
  {
    bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
    heading: 'Social Awareness',
    description: 'We promote social responsibility through local outreach and action.',
    light: '17+ Campaigns',
    follow: 'Follow us on',
    image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo15_noyibr.jpg',
  },
  {
    bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
    heading: 'Animal Protection',
    description: 'We rescue and protect animals while spreading compassion for wildlife.',
    light: '400+ Rescues',
    image:
      'https://images.unsplash.com/photo-1592664858934-40ca080ab56b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    follow: 'Follow us on',
  },
];

export default function HighlightsSlider() {
  const rootRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const pauseAutoplayTemporarily = () => {
    setAutoplay(false);
    window.setTimeout(() => setAutoplay(true), 5000);
  };

  useEffect(() => {
    if (!autoplay || isHovering) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [autoplay, isHovering]);

  useGSAP(
    () => {
      gsap.from('.hs-shell', {
        opacity: 0,
        y: 26,
        duration: 0.85,
        ease: 'power3.out',
      });

      gsap.from('.hs-nav-btn, .hs-dot-btn', {
        opacity: 0,
        y: 8,
        duration: 0.45,
        stagger: 0.05,
        delay: 0.2,
        ease: 'power2.out',
      });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hs-active .hs-heading',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.66 }
      )
        .fromTo(
          '.hs-active .hs-description',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          '-=0.4'
        )
        .fromTo(
          '.hs-active .hs-pill',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45 },
          '-=0.32'
        )
        .fromTo(
          '.hs-active .hs-follow',
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          '-=0.28'
        )
        .fromTo(
          '.hs-active .hs-social a',
          { y: 12, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.07 },
          '-=0.2'
        )
        .fromTo(
          '.hs-active .hs-image-wrap',
          { x: 36, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.72 },
          '-=0.56'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [currentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.killTweensOf('.hs-progress-fill');
      gsap.set('.hs-progress-fill', { scaleX: 0, transformOrigin: 'left center' });

      if (autoplay && !isHovering) {
        gsap.to('.hs-progress-fill', {
          scaleX: 1,
          duration: 5,
          ease: 'none',
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, [autoplay, isHovering, currentIndex]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      ref={rootRef}
      className="relative mb-10 w-full bg-white"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="hs-shell mx-auto h-[70vh] w-[90vw] overflow-hidden">
        <div
          key={currentIndex}
          className={`hs-active h-full w-full ${activeSlide.bg} flex flex-col items-center justify-between gap-8 px-5 md:flex-row md:px-20`}
        >
          <div className="max-w-full text-center md:mb-0 md:max-w-[45%] md:text-left">
            <h2 className="hs-heading mb-4 font-serif text-3xl leading-tight text-[#335288] md:text-5xl">
              {activeSlide.heading}
            </h2>
            <p className="hs-description mb-8 text-md leading-relaxed text-zinc-600 md:text-lg">
              {activeSlide.description}
            </p>

            <div className="flex flex-col items-center gap-4 md:items-start">
              <div className="hs-pill rounded-lg bg-[#335288] p-2 px-6 text-sm text-white shadow-lg md:text-base">
                {activeSlide.light}
              </div>
              <p className="hs-follow px-4 py-2 text-sm text-zinc-500 md:text-lg">
                {activeSlide.follow}
              </p>

              <div className="hs-social mt-1 flex gap-3 text-2xl text-[#335288]">
                {[
                  { icon: FaInstagram, url: 'https://instagram.com' },
                  { icon: FaYoutube, url: 'https://youtube.com' },
                  { icon: FaFacebook, url: 'https://facebook.com' },
                ].map(({ icon: Icon, url }) => (
                  <a
                    key={url}
                    className="rounded-full border-2 border-[#335288] p-3 shadow-md transition-all duration-300 hover:bg-[#335288] hover:text-white"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hs-image-wrap w-full max-w-full md:max-w-[45%]">
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <SkeletonImage
                src={activeSlide.image}
                alt={activeSlide.heading}
                className="h-[50vh] w-[80vw] object-cover md:h-[60vh] md:w-[45vw]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
          pauseAutoplayTemporarily();
        }}
        className="hs-nav-btn absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#335288] p-3 text-white shadow-lg transition-all duration-300 hover:bg-[#4477ce] md:left-6 md:p-4"
      >
        <FaChevronLeft size={20} />
      </button>

      <button
        onClick={() => {
          setCurrentIndex(prev => (prev + 1) % slides.length);
          pauseAutoplayTemporarily();
        }}
        className="hs-nav-btn absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#335288] p-3 text-white shadow-lg transition-all duration-300 hover:bg-[#4477ce] md:right-6 md:p-4"
      >
        <FaChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 flex w-full items-center justify-center gap-3 md:bottom-6">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => {
              setCurrentIndex(index);
              pauseAutoplayTemporarily();
            }}
            className={`hs-dot-btn cursor-pointer rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'h-4 w-8 bg-[#335288] md:w-10'
                : 'h-3 w-3 bg-gray-400 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      <div className="absolute left-0 top-0 h-1.5 w-full overflow-hidden bg-white/40">
        <div className="hs-progress-fill h-full w-full bg-[#335288]" />
      </div>
    </section>
  );
}
