import React from 'react';
import StatsSection from '../Components/StatsSection';
import Reviews from '../Components/Reviews';


const Storyline = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full bg-cover bg-center bg-[url('https://images.pexels.com/photos/31734104/pexels-photo-31734104/free-photo-of-rustic-ranch-house-in-rural-argentina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-[#ebebeb] p-[5vw]">
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-6 text-white">
            Our Story
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-light max-w-2xl mb-6">
            Empowering dreams, nurturing change — Aviyukt NGO is dedicated to building brighter futures with compassion and action.
          </p>
          <p className='text-lg'>Join us to make a change in the world.</p>
        </div>
      </div>

      {/* Join Section */}
<div className="w-full bg-[#ebebeb]">
  <div className="flex flex-col md:flex-row items-center justify-center w-full bg-white py-8 px-4 md:px-8">
    
    {/* Images Section */}
    <div className="flex items-center justify-center gap-4 mb-8 md:mb-0 w-full md:w-1/2">
      <div className="h-36 w-24 md:h-[45vh] md:w-[6.5vw] overflow-hidden rounded-full rotate-12">
      <img className='object-cover h-full w-full hover:scale-[1.1] transition duration-400' src="https://images.unsplash.com/photo-1596380297284-406d17428771?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="h-40 w-24 md:h-[60vh] md:w-[6.5vw] rounded-full rotate-12 overflow-hidden">
      <img className='h-full w-full object-cover hover:scale-[1.1] transition duration-400' src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo23_m0mmu8.jpg" alt="" />
      </div>
      <div className="h-36 w-24 md:h-[50vh] md:w-[6.5vw] rounded-full rotate-12 overflow-hidden">
      <img className='h-full w-full object-cover hover:scale-[1.1] transition duration-400' src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
    </div>

    {/* Text Section */}
    <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 text-[#335288]">
        Join Now
      </h1>
      <p className="text-base sm:text-lg md:text-xl font-light text-zinc-500 mb-6 max-w-xl">
        Join us in our mission to create a better world by empowering communities, driving change, and making a lasting impact. Together, we can build brighter futures for all.
      </p>
      <p className="text-base sm:text-lg text-gray-600 mb-6">
        Be the change you wish to see. Your small step can inspire big change.
      </p>

      {/* Phone Number Section */}
      <div className="flex items-center space-x-3 text-lg font-medium text-[#335288]">
        <span className="text-2xl">
          <i className="fa-solid fa-phone"></i>
        </span>
        <span>+91 (877) 032-1854</span>
      </div>
    </div>

  </div>

  {/* Stats Section */}
  <StatsSection />
</div>

{/* About Us Section */}
<div className="w-full flex flex-col md:flex-row items-center justify-between bg-white py-2 px-4 md:px-8 mb-8">
  
  {/* Text Section */}
  <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
    <h1 className="text-base md:text-lg text-gray-600 mb-4">About Us -</h1>
    <p className="text-3xl sm:text-4xl text-[#335288] font-serif mb-6">
      We Work with your<br />helping help!
    </p>
    <p className="text-base sm:text-lg text-zinc-500 mb-4">
      At Aviyukt NGO, we believe in creating a world where everyone has the opportunity to thrive. Our work spans across education, health, women empowerment, environment conservation, animal protection, and social welfare. Through our education initiatives, we aim to bridge learning gaps and open new doors for underprivileged children. In health, we focus on providing essential care and spreading awareness about preventive measures.
    </p>
    <p className="text-base sm:text-lg text-zinc-500">
      Our commitment to a better planet drives our efforts in environment conservation and animal protection. From tree plantation drives to rescuing and rehabilitating animals, we work tirelessly to protect nature’s precious resources. Through various social welfare projects, we strive to uplift marginalized communities, ensuring dignity, respect, and equal opportunities for all.
    </p>
  </div>

  {/* Image Section */}
  <div className="w-full md:w-1/2 flex justify-center">
    <img 
      className="w-full h-auto max-h-[600px] object-cover object-bottom rounded-lg"
      src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259323/about1_ppp4tc.jpg" 
      alt="About Us Image" 
    />
  </div>
</div>

   {/* Our Vision Section */}
<div className="w-full flex flex-col md:flex-row items-center justify-between bg-white py-8 px-4 md:px-8">
  <div className="w-full rounded-xl md:w-[40vw] flex justify-center items-center mb-6 md:mb-0 overflow-hidden">
    <img className="w-full h-[50vh] max-h-[450px] object-cover hover:scale-[1.1] duration-400 transition" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo21_rbv6ny.jpg" alt="Our Vision" />
  </div>
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-end text-center md:text-right p-4 md:p-8">
    <h1 className="text-2xl md:text-3xl text-[#335288] mb-4 font-serif">Our Vision</h1>
    <p className="text-base md:text-lg text-zinc-500 max-w-lg">
      To create an inclusive world where every individual has access to education, healthcare, equality, and a thriving environment, empowering communities to live with dignity, compassion, and sustainable growth for generations to come.
    </p>
  </div>
</div>

{/* Our Mission Section */}
<div className="w-full flex flex-col md:flex-row-reverse items-center justify-between bg-white py-8 px-4 md:px-8">
  <div className="w-full rounded-xl md:w-[40vw] flex justify-center items-center mb-6 md:mb-0 overflow-hidden">
    <img className="w-full h-[50vh] max-h-[350px] object-cover hover:scale-[1.1] duration-400 transition" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo14_kthtqb.jpg" alt="Our Mission" />
  </div>
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:p-8">
    <h1 className="text-2xl md:text-3xl text-[#335288] mb-4 font-serif">Our Mission</h1>
    <p className="text-base md:text-lg text-zinc-500 max-w-lg">
      To create an inclusive world where every individual has access to education, healthcare, equality, and a thriving environment, empowering communities to live with dignity, compassion, and sustainable growth for generations to come.
    </p>
  </div>
</div>

{/* Our Team */}
<div className="min-h-screen w-full bg-[#ebebeb] py-8 px-4">
  <h1 className="text-2xl md:text-3xl text-center text-[#335288] font-serif mb-12">
    Meet Our<br />| Founders & Team |
  </h1>

  <div className="w-full flex flex-wrap justify-center gap-8">
    {/* Single Card */}
    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] w-[125px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259325/President_uwnwyz.jpg" alt="President" />
      <h2 className="text-xl font-serif mb-2">President</h2>
      <p className="text-lg text-[#335288] mb-3">Narayan Kumar Shrivastav</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">As President of Aviyukt NGO, Narayan Kumar Shrivastav leads with vision and compassion, inspiring positive change across education, health, environment, and social welfare.</p>
    </div>

    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/SashiMishra_hkgc3u.jpg" alt="Vice President" />
      <h2 className="text-xl font-serif mb-2">Vice President</h2>
      <p className="text-lg text-[#335288] mb-3">Sashi Mishra</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">As Vice President of Aviyukt NGO, Sashi Mishra drives initiatives with dedication, empowering communities and building sustainable solutions for education, health, environment, and social progress.</p>
    </div>

    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259323/BrajeshPratapSingh_yxnij7.jpg" alt="Secretary" />
      <h2 className="text-xl font-serif mb-2">Secretary</h2>
      <p className="text-lg text-[#335288] mb-3">Brajesh Pratap Singh</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">Brajesh Pratap Singh, Secretary of Aviyukt NGO, is dedicated to strengthening operations, empowering teams, and fostering growth for a better and inclusive society.</p>
    </div>

    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/Shukrantishrivastava_vp5dmh.jpg" alt="Joint Secretary" />
      <h2 className="text-xl font-serif mb-2">Joint Secretary</h2>
      <p className="text-lg text-[#335288] mb-3">Dr. Shukranti Shrivastava</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">As Joint Secretary of Aviyukt NGO, Shukranti Shrivastava supports our mission with passion, ensuring strong teamwork, smooth operations, and impactful community service.</p>
    </div>

    {/* Second Row */}

    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259326/sapna_ulr1sk.jpg" alt="Treasurer" />
      <h2 className="text-xl font-serif mb-2">Treasurer</h2>
      <p className="text-lg text-[#335288] mb-3">Sapna Shrivastava</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">Sapna Shrivastava, Treasurer of Aviyukt NGO, is a trusted financial steward, ensuring transparency, integrity, and efficient management of resources to drive the organization's mission and growth.</p>
    </div>

    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259323/awadh_yizveu.jpg" alt="Board Member" />
      <h2 className="text-xl font-serif mb-2">Board Member</h2>
      <p className="text-lg text-[#335288] mb-3">Awadh Bihari Gautum</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">Awadh Bihari Gautam, Board Member at Aviyukt NGO, brings visionary leadership and unwavering dedication, inspiring lasting impact through his strategic direction and compassionate guidance.</p>
    </div>

    <div className="bg-white flex flex-col items-center p-6 w-[90%] sm:w-[45%] md:w-[30%] lg:w-[22%] shadow-md rounded-lg">
      <img className="h-[180px] object-cover rounded-full mb-4" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259325/pankaj_owsjx4.png" alt="Board Member" />
      <h2 className="text-xl font-serif mb-2">Board Member</h2>
      <p className="text-lg text-[#335288] mb-3">Pankaj Kumar Panthi</p>
      <hr className="h-[2px] bg-[#335288] w-[80%] mb-4" />
      <p className="text-sm text-center text-zinc-500">Pankaj Kumar Panthi, Board Member of Aviyukt NGO, brings invaluable leadership and strategic insight, helping guide the organization's mission with dedication, ensuring impactful and sustainable community development.</p>
    </div>
  </div>
</div>

{/* feedback section start */}
    <div className='w-full bg-white'>
      <Reviews/>
    </div>
    </>
  );
}

export default Storyline;
