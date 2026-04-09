import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import SkeletonImage from './SkeletonImage';

export default function HighlightsSlider() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const slides = [
    {
      bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
      heading: 'Promote education',
      description: 'In Bhopal we give education to the children.',
      light: '250+ Children',
      follow: 'Follow us on-',
      image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/education_dz4dcf.png',
      color: '#335288',
    },
    {
      bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
      heading: 'Environment Conservation',
      description: 'We plant more than 1150+ trees for green revolution.',
      light: '1150+ Plants',
      follow: 'Follow us on-',
      image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo12_i7kftb.jpg',
      color: '#335288',
    },
    {
      bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
      heading: 'Women Empowerment',
      description: 'Thrive to support women for equality and independency.',
      light: '12+ Meetings',
      follow: 'Follow us on-',
      image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo2_xov8qg.jpg',
      color: '#335288',
    },
    {
      bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
      heading: 'Health Campaign',
      description: 'Run campaign against Aids, HIV, Malaria, Dengue, etc.',
      light: '25+ Camps',
      follow: 'Follow us on-',
      image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo3_kduras.jpg',
      color: '#335288',
    },
    {
      bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
      heading: 'Social Awareness',
      description: 'Make people aware about social responsibility.',
      light: '17+ Campaigns',
      follow: 'Follow us on-',
      image: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo15_noyibr.jpg',
      color: '#335288',
    },
    {
      bg: 'bg-gradient-to-br from-[#ebebeb] to-[#f5f5f5]',
      heading: 'Animal Protection',
      description: 'To save wildlife species and protect them from cruelty.',
      light: '400+ Rescues',
      follow: 'Follow us on-',
      image:
        'https://images.unsplash.com/photo-1592664858934-40ca080ab56b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: '#335288',
    },
  ];

  // Auto-scroll with hover pause
  useEffect(() => {
    if (!autoplay || isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, autoplay, isHovering]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div
      className="w-full relative bg-white mb-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        ref={sliderRef}
        className="h-[70vh] w-[90vw] mx-auto overflow-hidden flex scroll-smooth no-scrollbar mt-10"
      >
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === currentIndex && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className={`h-full w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between ${slide.bg} px-5 md:px-20 gap-8`}
                >
                  {/* Left Side */}
                  <motion.div
                    className="text-center md:text-left max-w-full md:max-w-[45%] mb-5 md:mb-0"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h1
                      variants={itemVariants}
                      className="text-3xl md:text-5xl font-serif mb-4 text-[#335288] leading-tight"
                    >
                      {slide.heading}
                    </motion.h1>

                    <motion.p
                      variants={itemVariants}
                      className="text-md md:text-lg text-zinc-600 mb-8 leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col items-center md:items-start gap-4"
                    >
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="text-white p-2 px-6 bg-[#335288] text-sm md:text-base rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                      >
                        {slide.light}
                      </motion.div>

                      <motion.p
                        variants={itemVariants}
                        className="text-zinc-500 p-2 px-4 text-sm md:text-lg"
                      >
                        {slide.follow}
                      </motion.p>

                      {/* Social Media Links */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex gap-3 text-[#335288] text-2xl mt-2"
                      >
                        {[
                          { icon: FaInstagram, url: 'https://instagram.com' },
                          { icon: FaYoutube, url: 'https://youtube.com' },
                          { icon: FaFacebook, url: 'https://facebook.com' },
                        ].map(({ icon: Icon, url }, idx) => (
                          <motion.a
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 border-2 border-[#335288] rounded-full hover:bg-[#335288] hover:text-white transition-all duration-300 shadow-md"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon />
                          </motion.a>
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Right Side - Image */}
                  <motion.div
                    className="max-w-full md:max-w-[45%] w-full"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                      <SkeletonImage
                        src={slide.image}
                        alt={slide.heading}
                        className="w-[80vw] md:w-[45vw] h-[50vh] md:h-[60vh] object-cover"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-[#335288] text-white p-3 md:p-4 rounded-full hover:bg-[#4477ce] transition-all duration-300 shadow-lg z-10"
      >
        <FaChevronLeft size={20} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-[#335288] text-white p-3 md:p-4 rounded-full hover:bg-[#4477ce] transition-all duration-300 shadow-lg z-10"
      >
        <FaChevronRight size={20} />
      </motion.button>

      {/* Dots Indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-6 w-full flex justify-center items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setAutoplay(false);
              setTimeout(() => setAutoplay(true), 5000);
            }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === index
                ? 'bg-[#335288] h-4 w-8 md:w-10'
                : 'bg-gray-400 h-3 w-3 hover:bg-gray-500'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </motion.div>

      {/* Autoplay Indicator */}
      {autoplay && !isHovering && (
        <motion.div
          className="absolute top-4 right-4 text-xs text-zinc-500 bg-white px-3 py-1 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Auto-playing...
        </motion.div>
      )}
    </div>
  );
}
