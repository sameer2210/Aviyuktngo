import { memo } from 'react';
import { motion } from 'framer-motion';
import SkeletonImage from '../SkeletonImage';
import StatsSection from '../StatsSection';

const visionHTML = (
  <>
    <span className="text-[#6a94ff]">To create a just and equitable</span> society where every
    individual has access to <span className="text-[#6a94ff]">education, healthcare</span>, and
    opportunities for dignified living.
  </>
);

const missionPoints = [
  'To empower marginalized communities through education and vocational training.',
  'To improve access to quality healthcare and sanitation in rural areas.',
  'To promote women rights and economic self-reliance.',
  'To foster awareness on environmental sustainability and climate action.',
  'To facilitate social inclusion for people with disabilities and the elderly.',
];

const objectiveLeadHTML = (
  <>
    Objectives include health and sanitation awareness, women and adolescent empowerment, rights-based inclusion, sustainable agriculture,<br className="hidden md:block" /> livelihood support for tribal and Dalit communities, climate resilience,<br className="hidden md:block" /> and thoughtful water resource management.
  </>
);

const galleryImages = [
  'https://res.cloudinary.com/dc2geexnf/image/upload/v1775758274/558bbe83-c94e-4d9b-8395-50f8df170193.jpg_u4ocuf.jpg',
  'https://images.unsplash.com/photo-1759675934052-1d82517c76c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const PatternBg = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
    {/* Abstract mandala-like graphics using concentric circles */}
    <div className="absolute top-[-5%] left-[-15%] w-[800px] h-[800px] opacity-[0.05]">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black"
             style={{ width: `${(i+1)*50}px`, height: `${(i+1)*50}px`, opacity: 1 - i * 0.05 }} />
      ))}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" viewBox="0 0 100 100">
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={i} x1="50" y1="50" x2="50" y2="0" stroke="black" strokeWidth="0.1" transform={`rotate(${i * 15} 50 50)`} />
        ))}
      </svg>
    </div>

    <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] opacity-[0.05]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black"
             style={{ width: `${(i+1)*40}px`, height: `${(i+1)*40}px` }} />
      ))}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full" viewBox="0 0 100 100">
        <path d="M 0 50 L 100 50 M 50 0 L 50 100 M 15 15 L 85 85 M 15 85 L 85 15" stroke="black" strokeWidth="0.2" fill="none" />
      </svg>
    </div>
    <div className="absolute top-[8%] left-[28%] md:left-[22%] opacity-[0.08]">
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
         <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="1.5" strokeDasharray="3 3" />
         <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="1" />
         {Array.from({ length: 12 }).map((_, i) => (
           <path key={i} d="M50 20 Q55 50 50 80 Q45 50 50 20" stroke="black" strokeWidth="1" transform={`rotate(${i*30} 50 50)`} />
         ))}
      </svg>
    </div>
  </div>
);

const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const AimMissionSection = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-[#f4f3ef] min-h-screen py-24 lg:py-32 flex items-center">
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" />
        <PatternBg />

        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-[1fr_minmax(400px,45%)] gap-16 lg:gap-24 items-start xl:items-center">

          {/* Left Text Column */}
          <div className="flex flex-col pt-10">
            <FadeUp>
              <div className="flex items-center gap-6 mb-16">
                <h2 className="museum-serif text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#102e54]">
                  ABOUT AVIYUKT VISION AIM AND MISSION
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h3 className="museum-serif max-w-[42rem] mb-6 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] leading-[1.3] tracking-wide text-black">
                {visionHTML}
              </h3>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-10 lg:mt-12 space-y-4">
              {missionPoints.map((point, index) => (
                <p key={index} className="museum-serif text-[1rem] sm:text-[1.1rem] leading-[1.8] text-[#0d2238] max-w-[36rem]">
                  {point}
                </p>
              ))}
            </FadeUp>

            <FadeUp delay={0.3} className="mt-12 lg:mt-16">
              <p className="museum-serif text-[0.95rem] sm:text-[1.05rem] leading-[1.9] text-[#2c2b29] max-w-[40rem]">
                {objectiveLeadHTML}
              </p>
            </FadeUp>
          </div>

          {/* Right Image Column */}
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <FadeUp delay={0.2} className="h-[45vh] sm:h-[60vh] lg:h-[75vh] w-full">
                <SkeletonImage
                  src={galleryImages[0]}
                  alt="Aviyukt Mission Reference"
                  wrapperClassName="h-full w-full shadow-2xl bg-[#eae8e3]"
                  className="h-full w-full object-cover filter brightness-[0.85] contrast-[1.1]"
                  loading="lazy"
                />
              </FadeUp>
              <FadeUp delay={0.3} className="h-[45vh] sm:h-[60vh] lg:h-[75vh] w-full mt-10 lg:mt-16">
                <SkeletonImage
                  src={galleryImages[1]}
                  alt="Aviyukt Vision Reference"
                  wrapperClassName="h-full w-full shadow-2xl bg-[#eae8e3]"
                  className="h-full w-full object-cover filter brightness-[0.85] contrast-[1.1]"
                  loading="lazy"
                />
              </FadeUp>
            </div>

            {/* Sticky Red Banner */}
            <FadeUp delay={0.5} className="absolute -bottom-8 md:-bottom-8 -right-6 md:-right-10 lg:-right-16 left-4 md:left-[5%] lg:left-[-15%] z-20">
              <div className="bg-[#b93b26] p-5 sm:p-7 md:p-8 flex items-center justify-between gap-6 shadow-[0_20px_40px_rgba(185,59,38,0.3)] min-h-[5rem]">
                <p className="museum-serif text-white/95 text-[0.9rem] sm:text-[1.05rem] md:text-[1.15rem] tracking-wide leading-relaxed">
                  If you are considering supporting this mission, please click here.
                </p>
                <button className="text-white bg-transparent border-none uppercase tracking-[0.2em] font-semibold text-xs sm:text-sm whitespace-nowrap hover:text-white/80 transition-colors pt-1">
                  GUIDE
                </button>
              </div>
            </FadeUp>
          </div>

        </div>
      </section>

      <section className="bg-[#f4f3ef] px-4 pb-14 pt-10 sm:px-6 md:px-10 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#1b1a18]/12 bg-[#f9f8f4] shadow-sm">
          <StatsSection />
        </div>
      </section>
    </>
  );
};

export default memo(AimMissionSection);
