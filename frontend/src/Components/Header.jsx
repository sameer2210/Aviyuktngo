import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const navItems = [
  { label: 'Launch', path: '/' },
  { label: 'Insight', path: '/storyline' },
  { label: 'Services', path: '/services' },
  { label: 'Plans', path: '/plans' },
  { label: 'Donate', path: '/highlights' },
];

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Scroll show/hide header.
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

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-300 ${showHeader ? 'top-0' : '-top-28'}`}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 pt-2 md:pt-3">
        <div
          className={`rounded-2xl transition-all duration-300 ${
            isAtTop
              ? 'bg-white/70 border border-white/80 shadow-sm backdrop-blur-md'
              : 'bg-white/95 border border-[#dbe3f1] shadow-md backdrop-blur-md'
          }`}
        >
          <div className="h-16 md:h-[72px] grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 md:px-4">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center">
              <img
                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover ring-1 ring-[#d7dfef]"
                src="https://res.cloudinary.com/dyvccryuz/image/upload/v1746258864/My%20Brand/logo_jo4h7x.png"
                alt="Aviyukt NGO Logo"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex justify-center ml-8">
              <div className="inline-flex items-center gap-1 rounded-full p-1.5">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-4 lg:px-5 py-2 rounded-full text-[17px] font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-[#335288] text-white shadow-sm'
                          : 'text-[#1f3355] hover:bg-[#e8effd] hover:text-[#28457a]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Login / Profile (Desktop) */}
            <div className="hidden md:flex justify-end">
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d4deee] bg-white px-4 py-2.5 text-[#223a63] font-medium hover:bg-[#f1f6ff] transition-colors"
                >
                  <FaUser />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center rounded-full bg-[#335288] px-5 py-2.5 text-white font-medium hover:bg-[#28457a] transition-colors shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Hamburger Button */}
            <div className="md:hidden flex justify-end">
              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-[#d6deee] bg-white text-[#223a63]"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden px-3 pb-3">
              <div className="rounded-xl border border-[#e1e8f6] bg-white shadow-sm p-2 flex flex-col">
                {navItems.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-[16px] transition-colors ${
                        isActive ? 'bg-[#335288] text-white' : 'text-[#1f3355] hover:bg-[#eef3fd]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <div className="pt-2">
                  {isAuthenticated ? (
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="w-full inline-flex justify-center items-center gap-2 rounded-lg border border-[#d4deee] bg-white px-4 py-2.5 text-[#223a63] font-medium"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setMenuOpen(false)}
                      className="w-full inline-flex justify-center items-center rounded-lg bg-[#335288] px-4 py-2.5 text-white font-medium"
                    >
                      Continue with Google
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
