import React, { useState, useEffect, useRef } from 'react';
import { FaProjectDiagram, FaUsers, FaDonate } from 'react-icons/fa';

const StatsSection = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [donorsCount, setDonorsCount] = useState(0);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const startCounting = () => {
    let i = 0;
    const targetProjects = 15;
    const targetVolunteers = 45;
    const targetDonors = 100;

    const interval = setInterval(() => {
      if (i < targetProjects) {
        setProjectsCount(i + 1);
      }
      if (i < targetVolunteers) {
        setVolunteersCount(i + 1);
      }
      if (i < targetDonors) {
        setDonorsCount(i + 1);
      }
      if (i >= targetProjects && i >= targetVolunteers && i >= targetDonors) {
        clearInterval(interval);
      }
      i++;
    }, 20);
  };

  return (
    <div ref={sectionRef} className="py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif text-white mb-10">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col items-center">
            <FaProjectDiagram className="text-4xl mb-4 border-1 p-2 rounded-4xl hover:text-[#335288]" />
            <h3 className="text-2xl font-semibold mb-4 text-[#335288] ">{projectsCount}+ Projects</h3>
            <p className="text-gray-600">We have made a difference in various areas.</p>
          </div>

          <div className="flex flex-col items-center">
            <FaUsers className="text-4xl mb-4 border-1 p-2 rounded-4xl hover:text-[#335288]"/>
            <h3 className="text-2xl font-semibold mb-4 text-[#335288] ">{volunteersCount}+ Volunteers</h3>
            <p className="text-gray-600">Dedicated individuals helping to bring change.</p>
          </div>

          <div className="flex flex-col items-center">
            <FaDonate className="text-4xl mb-4 border-1 p-2 rounded-4xl hover:text-[#335288]"/>
            <h3 className="text-2xl font-semibold mb-4 text-[#335288] ">{donorsCount}+ Donors</h3>
            <p className="text-gray-600">Generous donors who make our work possible.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
