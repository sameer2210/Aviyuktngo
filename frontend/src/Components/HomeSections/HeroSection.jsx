import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { heroSlides } from '../../data/homepageContent';
import SkeletonImage from '../SkeletonImage';

const AUTO_PLAY_MS = 6200;

const eventDetails = [
  {
    title: 'Mino Washi Paper Lantern Art Exhibition at Bhopal Temple',
    dates: 'November 4, 2025 - December 1, 2025',
  },
  {
    title: '"Tobishima Lights" evening walk now welcoming visitors every weekend',
    dates: 'November 4, 2025 - December 1, 2025',
  },
  {
    title: 'Handmade lantern display with music, stories, and community gathering',
    dates: 'October 30, 2025 - December 21, 2025',
  },
];

const titleContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const titleWordVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (heroSlides.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!heroSlides.length) {
    return null;
  }

  const activeSlide = heroSlides[currentSlide];
  const nextSlide = heroSlides[(currentSlide + 1) % heroSlides.length];
  const activeEvent = eventDetails[currentSlide % eventDetails.length];
  const titleWords = activeSlide.title.split(' ');

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-[#080a0e] text-[#f7f0e2]">
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;

        return (
          <div
            key={`${slide.title}-${index}`}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              isActive ? 'z-20 opacity-100' : 'z-10 opacity-0'
            }`}
          >
            <SkeletonImage
              src={slide.image}
              alt={slide.title}
              wrapperClassName="absolute inset-0"
              className="hero-parallax h-full w-full object-cover"
              style={{
                transform: isActive
                  ? `translateY(${Math.min(scrollY * 0.1, 70)}px) scale(1.07)`
                  : 'scale(1.13)',
                transition: reduceMotion ? 'none' : 'transform 360ms linear',
              }}
              loading={isActive ? 'eager' : 'lazy'}
              fetchPriority={isActive ? 'high' : 'auto'}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-30 bg-[linear-gradient(108deg,rgba(4,6,9,0.82)_0%,rgba(4,6,9,0.48)_44%,rgba(4,6,9,0.83)_100%)]" />
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_44%_58%,rgba(236,183,112,0.18)_0%,rgba(6,8,13,0)_40%)]" />
      <div className="hero-film-grain pointer-events-none absolute inset-0 z-40" />

      <div className="relative z-50 flex min-h-screen flex-col px-6 pb-6 pt-7 sm:px-10 md:px-14 lg:px-20">
        <div className="flex items-start justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${currentSlide}`}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -18 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl pt-8 md:pt-14"
            >
              <p className="hero-overline text-sm uppercase tracking-[0.34em] text-[#ece4d4]/92 sm:text-base">
                {activeSlide.eyebrow}
              </p>

              <motion.h1
                variants={reduceMotion ? {} : titleContainerVariants}
                initial={reduceMotion ? false : 'hidden'}
                animate={reduceMotion ? {} : 'show'}
                className="hero-display-title mt-4 max-w-[20ch] text-[clamp(4rem,5vw,4rem)] uppercase leading-[1.05] tracking-[0.2em]"
              >
                {titleWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    variants={reduceMotion ? {} : titleWordVariants}
                    className="mr-[0.48em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <p className="mt-6 max-w-3xl text-sm font-semibold leading-[1.55] text-[#d9cfbf]/85 sm:text-[1.02rem]">
                {activeSlide.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={`vertical-${currentSlide}`}
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, x: 20 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="hero-vertical-text absolute right-2 top-1/2 hidden -translate-y-1/2 text-[clamp(1rem,4.4vw,1rem)] text-[#f8f1e5] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)] lg:block"
          >
            A world of deep, ethereal beauty.
          </motion.p>
        </AnimatePresence>

        <div className="mt-auto w-full pb-2 sm:pb-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`event-${currentSlide}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              <p className="hero-display-title text-[1.65rem] uppercase tracking-[0.08em] text-[#f1e8d8]">
                Event
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex gap-2">
                  <div className="h-20 w-28 overflow-hidden border border-white/40 bg-black/30">
                    <SkeletonImage
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="hidden h-20 w-28 overflow-hidden border border-white/40 bg-black/30 sm:block">
                    <SkeletonImage
                      src={nextSlide.image}
                      alt={nextSlide.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[clamp(1rem,2.1vw,1.9rem)] font-semibold leading-[1.25] text-[#f5ecde]">
                    {activeEvent.title}
                  </p>
                  <div className="inline-flex flex-wrap items-center gap-3 text-[#f1e7d7]">
                    <span className="border border-[#f1e7d7]/70 px-2 py-1 text-sm font-semibold uppercase tracking-[0.1em]">
                      Event dates:
                    </span>
                    <span className="text-[1.12rem] font-semibold">{activeEvent.dates}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-4 right-5 z-50 flex gap-2 sm:bottom-6 sm:right-10 md:right-14 lg:right-20">
          {heroSlides.map((slide, index) => (
            <button
              key={`${slide.title}-indicator-${index}`}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? 'w-12 bg-[#f6efe3]'
                  : 'w-4 bg-[#f6efe3]/50 hover:bg-[#f6efe3]/75'
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
