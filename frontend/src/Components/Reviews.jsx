// Reviews.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: "Narayan Kumar",
    role: "Member",
    message: "An inspiring organization with a heart for real change.",
    img: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/NaveenShrivastav_c7sa0p.jpg",
  },
  {
    name: "Anand Chauhan",
    role: "Donor",
    message: "Proud to be a supporter. Aviyukt's transparency is remarkable.",
    img: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/nandu_lfx39s.png",
  },
  {
    name: "Vikram Rana",
    role: "Doner",
    message: "Joining Aviyukt was the best decision — it feels like family!",
    img: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/vikku_fi4q4j.jpg",
  },
  {
    name: "Ankesh",
    role: "Beneficiary",
    message: "Our lives changed because Aviyukt believed in us.",
    img: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746259326/Anku_so4got.jpg",
  },
  {
    name: "Shukriti Shirvastava",
    role: "Member",
    message: "Incredible experience, true community empowerment!",
    img: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/Shukrantishrivastava_vp5dmh.jpg",
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#f0f4ff] to-[#ffffff] py-20 px-6 md:px-20">
      <h2 className="text-xl md:text-2xl text-center text-[#335288] font-serif mb-12">
        💬 Words From Our Community
      </h2>

      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="px-4">
            <div className="bg-white/80 backdrop-blur-md mb-6 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all hover:scale-105 hover:shadow-2xl duration-500 min-h-[400px]">
              <img
                src={review.img}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-[#335288]"
              />
              <h3 className="text-xl font-semibold text-[#335288] mb-1">{review.name}</h3>
              <p className="text-sm italic text-gray-500 mb-4">{review.role}</p>
              <p className="text-gray-700 leading-relaxed font-serif">{`"${review.message}"`}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Reviews;
