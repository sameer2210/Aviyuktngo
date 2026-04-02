import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FaUser } from 'react-icons/fa';
import axiosInstance from '../instant/axios';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Scroll show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setShowHeader(currentScroll < scrollTop || currentScroll < 10);
      setScrollTop(currentScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTop]);

  const isAtTop = scrollTop < 10;

  // Check login status from cookie session
  useEffect(() => {
    axiosInstance
      .get('/user/validate', { withCredentials: true })
      .then((res) => {
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false)
      });
  }, []);

  return (
    <header
      className={`z-50 fixed w-full py-2 transition-all duration-300 
      ${showHeader ? 'top-0' : '-top-[130px]'}
      ${isAtTop ? 'bg-transparent text-white' : 'bg-[#ebebeb] text-black'}`}
    >
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap px-6 md:px-12 py-4 md:py-2 gap-4">
        {/* Logo */}
        <img className="w-20" src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258864/My%20Brand/logo_jo4h7x.png" alt="Logo" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex bg-white text-lg py-3 w-auto px-5 text-black rounded-4xl justify-center gap-[3vw] items-center">
          <Link to="/" className="hover:underline underline-offset-[4px] transition-all duration-300">Launch</Link>
          <Link to="/storyline" className="hover:underline underline-offset-[4px] transition-all duration-300">Insight</Link>
          <Link to="/plans" className="hover:underline underline-offset-[4px] transition-all duration-300">Plans</Link>
          <Link to="/highlights" className="hover:underline underline-offset-[4px] transition-all duration-300">Donate</Link>
        </nav>

        {/* Login / Profile (Desktop) */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center rounded-full">
            {isLoggedIn ? (
              <Link to="/profile">
                <div className='px-3.5 flex justify-center items-center gap-2 py-2 border-1 border-white rounded-full hover:bg-white hover:text-black transition duration-300'>
                <FaUser className=" border-white" />
                <p>Profile</p>
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className={`relative overflow-hidden px-6 py-1.5 rounded-full transition duration-300
                ${isAtTop ? 'bg-transparent text-white border border-white hover:bg-white hover:text-black' : 'bg-white text-black border border-white hover:bg-transparent hover:text-white'}`}
              >
                <span className="relative z-10 text-lg">Login</span>
              </Link>
            )}
          </div>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white text-center text-black flex flex-col gap-4 py-4 px-6 shadow-md md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline underline-offset-[4px] transition-all duration-300">Launch</Link>
          <Link to="/storyline" onClick={() => setMenuOpen(false)} className="hover:underline underline-offset-[4px] transition-all duration-300">Insight</Link>
          <Link to="/plans" onClick={() => setMenuOpen(false)} className="hover:underline underline-offset-[4px] transition-all duration-300">Plans</Link>
          <Link to="/highlights" onClick={() => setMenuOpen(false)} className="hover:underline underline-offset-[4px] transition-all duration-300">Connect</Link>

          {isLoggedIn ? (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              <FaUser className="bg-black text-white px-4 py-1 rounded hover:text-black hover:bg-white transition duration-300" />
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-black text-white px-4 py-1 rounded hover:text-black hover:bg-white transition duration-300"
            >
              <span className="relative z-10">Login</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
