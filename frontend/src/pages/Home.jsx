import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // make sure you're using react-router
import StatsSection from '../Components/StatsSection';
import HighlightsSlider from '../Components/HighlightsSlider';
import axios from '../instant/axios';
const slides = [
  {
    bg: 'https://images.pexels.com/photos/3959485/pexels-photo-3959485.jpeg',
    title: 'Donate Today',
    text: 'Together, we can uplift communities and become the helping hand of each other by helping and show them our presence.',
  },
  {
    bg: 'https://images.pexels.com/photos/5486966/pexels-photo-5486966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Spread Kindness',
    text: 'Kindness is a powerful force. A simple smile, gentle words, or helpful act can uplift spirits, create hope, and inspire others.',
  },
  {
    bg: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259324/home_btdhj7.jpg',
    title: 'Empower Change',
    text: 'Empowering change begins with belief—in ourselves and others. Through collective action, compassion, and courage, we can transform lives, challenge injustice, and build a brighter future.',
  },
  {
    bg: 'https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/education_dz4dcf.png',
    title: 'Support Education',
    text: 'Supporting education unlocks potential, bridges gaps, and fosters equality. By investing in knowledge, we empower individuals to create positive change, shaping a better tomorrow for all.',
  },
  {
    bg: 'https://images.unsplash.com/photo-1628717341663-0007b0ee2597?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Volunteer With Us',
    text: 'Volunteering with us means making a direct impact. Your time and efforts help build stronger communities, providing support where its most needed and changing lives.',
  },
];

const Slide = ({ bg, title, text, isActive }) => (
  <div
    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="h-full w-full flex flex-col items-center justify-center text-center text-white px-4 bg-black/40">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
      <p className="text-lg md:text-xl max-w-2xl mb-6">{text}</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/Highlights"
          className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
        >
          Become Member
        </Link>
        <Link
          to="/Highlights"
          className="px-10 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
        >
          Donate Now
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/contact/email", formData);
      console.log("Server Response:", response.data);
      alert("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data");
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <Slide
            key={index}
            bg={slide.bg}
            title={slide.title}
            text={slide.text}
            isActive={index === currentSlide}
          />
        ))}
      </div>
      <div className='h-auto w-full bg-[#EBEBEB]'>
        <div className='flex flex-col md:flex-row justify-around p-6 items-center gap-12'>

          {/* Our Mission */}
          <div className='flex flex-col items-center text-center gap-4'>
            <div className='b-transparent hover:text-[#335288] hover:border-[#335288] border-1 px-4 py-3 rounded-full'>
              {/* Example icon */}
              <i class="fa-solid fa-briefcase"></i>
            </div>
            <h1 className='text-xl font-bold text-[#335288]'>Our Mission</h1>
            <p className='max-w-xs text-gray-700'>We aim to create lasting change through community-driven initiatives and education.</p>
          </div>

          {/* Make Donations */}
          <div className='flex flex-col items-center text-center gap-4'>
            <div className='bg-transparent hover:text-[#335288] hover:border-[#335288] border-1 px-[15px] py-3 rounded-full'>
              {/* Example icon */}
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            <h1 className='text-xl font-bold text-[#335288]'>Make Donations</h1>
            <p className='max-w-xs text-gray-700'>Your support helps us bring vital resources to the people who need them most.</p>
          </div>

          {/* Become Volunteer */}
          <div className='flex flex-col items-center text-center gap-4'>
            <div className='bg--transparent hover:text-[#335288] hover:border-[#335288] border-1 px-3.5 py-3 rounded-full'>
              {/* Example icon */}
              <i class="fa-solid fa-handshake-angle"></i>
            </div>
            <h1 className='text-xl font-bold text-[#335288]'>Become Volunteer</h1>
            <p className='max-w-xs text-gray-700'>Join our team of dedicated volunteers and help make a meaningful difference.</p>
          </div>
        </div>

        {/* our causes */}
        <div className='h-auto w-full md:w-[70%] mx-auto py-10'>
          {/* Heading and Buttons */}
          <div className='flex justify-between items-center mb-6 px-4'>
            <h1 className='text-2xl md:text-3xl font-serif text-[#335288]'>Our Cause</h1>
            <div className='flex gap-4'>
              <i
                className="fa-solid fa-chevron-left px-4 py-3.5 bg-[#335288] text-white hover:bg-[#4477ce] active:scale-90 transition transform duration-150 ease-in-out cursor-pointer rounded"
                onClick={() => {
                  const container = document.getElementById('slider');
                  const cardWidth = container.offsetWidth / 3;
                  container.scrollLeft -= cardWidth;
                }}
              ></i>
              <i
                className="fa-solid fa-chevron-right px-4 py-3.5 bg-[#335288] text-white hover:bg-[#4477ce] active:scale-90 transition transform duration-150 ease-in-out cursor-pointer rounded"
                onClick={() => {
                  const container = document.getElementById('slider');
                  const cardWidth = container.offsetWidth / 3;
                  container.scrollLeft += cardWidth;
                }}
              ></i>
            </div>
          </div>

          {/* Slider */}
          <div id="slider" className='flex overflow-x-hidden border-t-1 p-2 border-zinc-500 scroll-smooth'>
            {/* Card 1 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo17_ljomim.jpg"
                  alt="Support Education"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Free Education</h2>
                  <p className='text-gray-600 text-sm'>Help children access quality education and a brighter future.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-110 transition duration-300'
                  src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo16_osxlpx.jpg"
                  alt="Healthcare Aid"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Healthcare Aid</h2>
                  <p className='text-gray-600 text-sm'>Provide essential medical services to rural communities.</p>
                </div>
              </div>
            </div>


            {/* Card 3 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo9_c2ukbt.jpg"
                  alt="Feed the Hungry"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Feed the Hungry</h2>
                  <p className='text-gray-600 text-sm'>Distribute food to families facing hunger and poverty.</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo1_blwial.jpg"
                  alt="Disaster Relief"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Disaster Relief</h2>
                  <p className='text-gray-600 text-sm'>Support recovery efforts for those affected by disasters.</p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo2_xov8qg.jpg"
                  alt="Women Empowerment"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Women Empowerment</h2>
                  <p className='text-gray-600 text-sm'>Empower women through education, skills and opportunities.</p>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo13_idz2pi.jpg"
                  alt="Save Environment"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Save Environment</h2>
                  <p className='text-gray-600 text-sm'>Protect natural resources and promote sustainable living.</p>
                </div>
              </div>
            </div>

            {/* Card 7 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://images.pexels.com/photos/6235021/pexels-photo-6235021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Animal Welfare"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Animal Welfare</h2>
                  <p className='text-gray-600 text-sm'>Provide shelter and food for stray and abandoned animals.</p>
                </div>
              </div>
            </div>

            {/* Card 8 */}
            <div className='min-w-full md:min-w-1/2 lg:min-w-1/3 p-2 md:p-4'>
              <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center'>
                <img
                  className='h-48 w-full object-cover hover:scale-[1.1] transition duration-300'
                  src="https://plus.unsplash.com/premium_photo-1702088085024-85e3cdd462fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Art and Culture"
                />
                <div className='p-4'>
                  <h2 className='text-lg font-semibold text-gray-800 mb-2'>Art and Culture</h2>
                  <p className='text-gray-600 text-sm'>Preserve and promote local art and cultural heritage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[100vh] w-full bg-[#ebebeb]">
        {/* Top Section */}
        <div className="min-h-[50vh] w-full flex flex-col md:flex-row justify-center items-center bg-[#071243] mb-2">

          {/* Text Side */}
          <div className="w-full md:w-[50%] h-full flex flex-col justify-center px-[5vw] py-4">
            <h1 className="text-3xl md:text-4xl text-white font-serif mb-4 md:text-left">
              Our <span className="text-[#335288]">Dedicated Hands,</span><br /> Transforming Lives Together
            </h1>
            <p className="w-full md:w-full text-base md:text-lg text-white md:text-left">
              Our volunteers are the heart of our mission, working tirelessly to uplift communities, spread hope, and create lasting change through their compassion, dedication, and selfless service every day.
            </p>
          </div>

          {/* Image Side */}
          <div className="w-full md:w-[50%] h-full flex justify-center md:justify-end">
            <img className="h-[60vh] object-contain" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/volunteer_a8negb.png" alt="" />
          </div>

        </div>

        {/* Bottom Section */}
        <div className="min-h-[80vh] w-full flex flex-col justify-center items-center p-4">
          <h1 className="text-3xl md:text-4xl text-[#071243] font-serif mb-6 text-center">
            Volunteer to Grow Country
          </h1>

          <div className="flex flex-col sm:flex-row items-center">

            <form onSubmit={handleSubmit} >
              

            <div className="flex flex-wrap sm:flex-nowrap w-full">
  <input
    type="email"
    name="email"
    className="h-12 flex-1 min-w-70 border border-zinc-500 outline-none sm:rounded-tl-xl px-2 bg-white"
    placeholder="Enter your email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <button
    type="submit"
    className="h-12 w-full sm:w-auto px-4 bg-[#335288] text-lg font-serif rounded-br-xl sm:rounded-bl-none text-white"
  >
    Submit
  </button>
</div>

            </form>

          </div>

          <StatsSection />
        </div>
      </div>

      {/* project section start */}
      <div className='hidden md:flex w-[90vw] mx-auto justify-between items-center gap-5 py-10'>

        {/* Left big image */}
        <div className="relative h-[30vh] md:h-[53vh] w-full md:w-[25%] overflow-hidden group">
          <img
            src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo8_igrw89.jpg"
            alt=""
            className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <h1 className="text-white text-2xl font-bold">Raise Donation</h1>
          </div>
        </div>

        {/* Right side */}
        <div className='flex flex-col gap-5 w-full md:w-[74%]'>

          {/* Top row */}
          <div className='flex flex-col md:flex-row justify-start items-center gap-10'>

            {/* Small image */}
            <div className="relative h-[30vh] md:h-[25vh] w-full md:w-[20vw] overflow-hidden group">
              <img
                src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo23_m0mmu8.jpg"
                alt=""
                className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h1 className="text-white text-2xl font-bold">Green Revolution</h1>
              </div>
            </div>

            {/* Text */}
            <div className='text-center md:text-left'>
              <h1 className='text-2xl font-serif mb-2'>Our <span className='text-[#335288]'>Define Work!</span></h1>
              <p className='text-lg mb-4'>Engaging our team in projects in dream to bring change.</p>
              <div className='flex justify-center items-center gap-2 w-30'>
                <i className="fa-solid fa-arrow-left px-[9px] py-[8px] border-1 hover:text-[#335288] hover:border-[#335288] border-zinc-400 rounded-4xl"></i>
                <p className='px-4 py-1 border-1 w-20 border-zinc-400 rounded-4xl hover:text-[#335288] hover:border-[#335288]'>Hover</p>
              </div>
            </div>
          </div>

          {/* Bottom 3 images */}
          <div className='flex justify-between items-center gap-5'>

            <div className="relative h-[30vh] md:h-[25vh] w-full md:w-[32%] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1622908961227-ebf9ccdc342d?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h1 className="text-white text-2xl font-bold">Save Animals</h1>
              </div>
            </div>

            <div className="relative h-[30vh] md:h-[25vh] w-full md:w-[32%] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1709122066713-4c904721a378?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h1 className="text-white text-2xl font-bold">Women Empowerment</h1>
              </div>
            </div>

            <div className="relative h-[30vh] md:h-[25vh] w-full md:w-[32%] overflow-hidden group">
              <img
                src="https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h1 className="text-white text-2xl font-bold">Promote Education</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revolution Section */}
      <div className="w-full py-12 px-6 md:px-16 bg-[#ebebeb] relative">
        <h1 className="text-[#335288] text-2xl font-serif mb-12">__Join us-</h1>

        <div className="flex flex-wrap justify-center items-center gap-8 mb-25">
          {/* Card 1 */}
          <div className="h-auto w-full sm:w-[80%] md:w-[45%] lg:w-[28%] flex flex-col items-center">
            <img
              className="w-full h-[250px] object-cover rounded-md hover:rotate-6 transition-all duration-300"
              src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo12_i7kftb.jpg"
              alt="Plant Trees"
            />
            <div className="flex justify-around items-center w-full my-4">
              <h1 className="text-xl font-serif">Plant Trees</h1>
              <p className="text-zinc-500 font-serif text-lg">1150+</p>
            </div>
            <p className="text-center text-lg px-2">
              Plant trees today to gift a greener, cleaner, and healthier tomorrow for the next future generations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="h-auto w-full sm:w-[80%] md:w-[45%] lg:w-[28%] flex flex-col pb-10 items-center">
            <img
              className="w-full h-[250px] object-cover rounded-md hover:rotate-6 transition-all duration-300"
              src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo19_yaqpxi.jpg"
              alt="Awareness Campaign"
            />
            <div className="flex justify-around items-center w-full my-4">
              <h1 className="text-xl font-serif">Awareness Campaign</h1>
              <p className="text-zinc-500 font-serif text-lg">18+</p>
            </div>
            <p className="text-center text-lg px-2">
              Raise your voice, not pollution — protect our planet with cleaner choices and responsible actions today.
            </p>
          </div>

          {/* Card 3 */}
          <div className="h-auto w-full sm:w-[80%] md:w-[45%] lg:w-[28%] flex flex-col items-center">
            <img
              className="w-full h-[250px] object-cover rounded-md hover:rotate-6 transition-all duration-300"
              src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo5_vi1ugb.jpg"
              alt="Forest Conservation"
            />
            <div className="flex justify-around items-center w-full my-4">
              <h1 className="text-xl font-serif">Forest Conservation</h1>
              <p className="text-zinc-500 font-serif text-lg">6+ acre</p>
            </div>
            <p className="text-center text-lg px-2">
              Forests breathe life into Earth; conserving them today ensures a greener, healthier world for generations.
            </p>
          </div>
        </div>

        {/* Learn More Button */}
        <Link
          to="/Plans"
          className="absolute right-6 bottom-6 md:right-16 md:bottom-16 bg-[#335288] text-white pr-2 pl-3 py-2 rounded-full flex items-center gap-2 group"
        >
          Learn More
          <i className="fa-solid fa-arrow-right border-1 px-[13px] py-3 rounded-4xl transition-transform duration-300 group-hover:translate-x-2"></i>
        </Link>
      </div>
      <HighlightsSlider />
    </>
  );
};

export default Home;
