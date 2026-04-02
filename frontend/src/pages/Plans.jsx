import React, { useState } from 'react';

const categories = [
  "All",
  "Education",
  "Health",
  "Women Empowerment",
  "Animal Protection",
  "Environment Conservation",
  "Social Welfare",
];

const projectsData = [
  {
    id: 1,
    category: "Education",
    title: "School for Underprivileged",
    status: "Running",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo17_ljomim.jpg",
    rating: 4.8,
    scale: "500+ Students",
  },
  {
    id: 2,
    category: "Health",
    title: "Free Medical Camps",
    status: "Completed",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo16_osxlpx.jpg",
    rating: 4.9,
    scale: "1000+ People",
  },
  {
    id: 3,
    category: "Women Empowerment",
    title: "Skill Training for Women",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1634351356743-05de62a4b80b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    scale: "300+ Women",
  },
  {
    id: 4,
    category: "Animal Protection",
    title: "Animal Rescue Program",
    status: "Running",
    image: "https://images.unsplash.com/photo-1592664858934-40ca080ab56b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    scale: "200+ Animals",
  },
  {
    id: 5,
    category: "Environment Conservation",
    title: "Tree Plantation Drive",
    status: "Completed",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo23_m0mmu8.jpg",
    rating: 4.9,
    scale: "10,000+ Trees",
  },
  {
    id: 6,
    category: "Social Welfare",
    title: "Clean & Green India",
    status: "Running",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo9_c2ukbt.jpg",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 7,
    category: "Social Welfare",
    title: "Organic Innovation",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1604906145290-c92a636a9617?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 8,
    category: "Animal Protection",
    title: "Feed to Street Animals",
    status: "Running",
    image: "https://images.unsplash.com/photo-1668522907255-62950845ff46?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 9,
    category: "Environment Conservation",
    title: "Deforestation Camps",
    status: "Completed",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo12_i7kftb.jpg",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 10,
    category: "Environment Conservation",
    title: "Plant Trees",
    status: "Running",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo13_idz2pi.jpg",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 11,
    category: "Education",
    title: "Free Books & Other Stuff",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1582886986754-51997372b668?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 12,
    category: "Social Welfare",
    title: "Feed to The Need",
    status: "Running",
    image: "https://images.unsplash.com/photo-1660015154781-9ac182923e02?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    scale: "50+ Centers",
  },
  {
    id: 13,
    category: "Health",
    title: "Health Collab with Aaganwadi",
    status: "Running",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo1_blwial.jpg",
    rating: 4.9,
    scale: "1000+ People",
  },
  {
    id: 14,
    category: "Women Empowerment",
    title: "Awareness for Safety",
    status: "Completed",
    image: "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo2_xov8qg.jpg",
    rating: 4.7,
    scale: "300+ Women",
  },
  {
    id: 15,
    category: "Animal Protection",
    title: "Save From Cruelity",
    status: "Running",
    image: "https://images.unsplash.com/photo-1722415165787-f212a7343d3f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    scale: "150+ Animals",
  },
];

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  return (
    <div className="w-full">
     <section
  className="relative w-full h-[50vh] flex items-center justify-center text-white"
>
  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1660553688466-f399a96f5f57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Black Transparent Overlay */}
  <div className="absolute inset-0 bg-[#00000071]"></div>

  {/* Text Content */}
  <div className="relative z-10 text-center px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
    <p className="text-lg md:text-xl max-w-2xl mx-auto">
      Explore our initiatives focused on education, health, environment, and community development.
    </p>
  </div>
</section>


      {/* Categories Strip */}
      <div className="flex flex-wrap justify-center gap-4 py-8 bg-gray-100 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-[#335288] text-white"
                : "bg-white text-[#335288] border border-[#335288] hover:bg-[#335288] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 md:p-8 mb-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover hover:scale-[1.1] transition duration-400" />
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col gap-2">
              <div className='flex justify-between items-center'>
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p
                  className={`text-gray-500 px-4 py-1.5 rounded-4xl border-1 ${
                   project.status === "Running"
                   ? "bg-blue-100 border-[#335288]"
                  : project.status === "Completed"
                   ? "bg-green-100 border-green-400"
                  : "bg-gray-100 border-gray-300"
                  }`}
>
  {project.status}
</p>
              </div>
              <p className="text-sm text-gray-600">{project.category}</p>

              {/* Rating and Scale */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-yellow-500 font-semibold">{project.rating} ⭐</span>
                <span className="text-gray-500 text-sm">{project.scale}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* our gallery section */}
      <div className="w-full bg-[#F3F4F6] py-10 px-4">
  <h1 className="text-center text-4xl text-[#335288] font-serif mb-8">
    Our Project <br /> <span className='text-xl text-zinc-500'>Insights</span>
  </h1>

  <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
    {[
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo17_ljomim.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo2_xov8qg.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo3_kduras.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo4_axjnmy.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo5_vi1ugb.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo6_ocgh8f.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo7_z6v7ed.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo8_igrw89.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo9_c2ukbt.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo10_lxgjpx.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo11_mfrchm.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258776/photo12_i7kftb.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo13_idz2pi.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo14_kthtqb.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258777/photo15_noyibr.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo16_osxlpx.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258778/photo17_ljomim.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo18_jnqnw7.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo19_yaqpxi.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo20_e1var1.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo21_rbv6ny.jpg",
      "https://res.cloudinary.com/dyvccryuz/image/upload/v1746258779/photo22_fdfdic.jpg",
    ].map((src, index) => (
      <div
        key={index}
        className="break-inside-avoid overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-300 ease-in-out"
      >
        <img
          src={src}
          alt={`project-${index}`}
          className="w-full h-auto object-cover rounded-2xl"
        />
      </div>
    ))}
  </div>
</div>

<div className="w-[90vw] h-[60vh] flex justify-center items-center bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 mx-auto my-10 px-6 sm:px-10 md:px-16 relative overflow-hidden">
  {/* Optional glowing overlay effect */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl pointer-events-none"></div>

  <img
    className="w-[80%] max-w-[800px] object-contain z-10"
    src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746259327/project_yjyfdq.png"
    alt="Project"
  />
</div>


    </div>
  );
};

export default ProjectsPage;
