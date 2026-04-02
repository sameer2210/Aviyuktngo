import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

export default function HighlightsSlider() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      bg: "bg-[#ebebeb]",
      heading: "Promote education",
      description: "In Bhopal we give education to the children.",
      light: "250+ Children",
      follow: "Follow us on-",
      image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/education_dz4dcf.png",
    },
    {
      bg: "bg-[#ebebeb]",
      heading: "Environment Conservation",
      description: "We plant more than 1150+ trees for green revolution.",
      light: "1150+ Plants",
      follow: "Follow us on-",
      image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo12_i7kftb.jpg",
    },
    {
      bg: "bg-[#ebebeb]",
      heading: "Women Empowerment",
      description: "Thrive to support women for equality and independency.",
      light: "12+ Meetings",
      follow: "Follow us on-",
      image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo2_xov8qg.jpg",
    },
    {
      bg: "bg-[#ebebeb]",
      heading: "Health Campaign",
      description: "Run campaign against Aids, HIV, Malaria, Dengue, etc.",
      light: "25+ Camps",
      follow: "Follow us on-",
      image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo3_kduras.jpg",
    },
    {
      bg: "bg-[#ebebeb]",
      heading: "Social Awareness",
      description: "Make people aware about social responsibility.",
      light: "17+ Campaigns",
      follow: "Follow us on-",
      image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo15_noyibr.jpg",
    },
    {
      bg: "bg-[#ebebeb]",
      heading: "Animal Protection",
      description: "To save wildlife species and protect them from cruelty.",
      light: "400+ Rescues",
      follow: "Follow us on-",
      image: "https://images.unsplash.com/photo-1592664858934-40ca080ab56b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: currentIndex * sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="w-full relative bg-white mb-10">
      <div
        ref={sliderRef}
        className="h-[70vh] w-[90vw] mx-auto overflow-hidden flex scroll-smooth no-scrollbar mt-10"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`h-full w-full flex-shrink-0 flex flex-col md:flex-row items-center justify-between ${slide.bg} px-5 md:px-20`}
          >
            {/* Left Side */}
            <div className="text-center md:text-left max-w-full md:max-w-[50%] mb-5 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-serif mb-4 text-[#335288]">
                {slide.heading}
              </h1>
              <p className="text-md md:text-lg text-zinc-600 mb-8">{slide.description}</p>
              <div className="flex flex-col items-center md:items-start gap-4">
                <p className="text-white p-2 px-4 bg-[#335288] text-sm md:text-base">
                  {slide.light}
                </p>
                <p className="text-zinc-500 p-2 px-4 text-sm md:text-lg">
                  {slide.follow}
                </p>
                {/* Social Media Links */}
                <div className="flex gap-4 text-[#335288] text-2xl">
                  <a className="p-2 border-1 rounded-full" href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a className="p-2 border-1 rounded-full" href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                  <a className="p-2 border-1 rounded-full" href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="max-w-full md:max-w-[50%]">
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-[80vw] md:w-[50vw] h-[60vh] object-cover rounded-lg mx-auto"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center items-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-[#335288] scale-110"
                : "bg-gray-400 scale-90"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
