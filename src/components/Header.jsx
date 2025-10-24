import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaCaretDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUserStart, signInSuccess } from '../redux/user/userSlice';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    setSearchTerm(searchTermFromUrl);
  }, [window.location.search]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top top",
      end: 99999,
      toggleClass: { targets: headerRef.current, className: "glass-header-active" },
      onEnter: () => gsap.to(headerRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        duration: 0.3,
      }),
      onLeaveBack: () => gsap.to(headerRef.current, {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "none",
        backdropFilter: "blur(0px)",
        border: "none",
        duration: 0.3,
      }),
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (searchTerm.trim()) {
      urlParams.set('searchTerm', searchTerm.trim());
    }
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleSignOut = async () => {
    dispatch(signoutUserStart());
    await fetch('/api/auth/signout');
    dispatch(signInSuccess());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <style>
        {`
          header.glass-header-active {
            background-color: rgba(255, 255, 255, 0.6) !important;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            transition: background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease;
          }
          header {
            background-color: rgba(255, 255, 255, 0.1);
            transition: background-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease, border 0.3s ease;
          }
        `}
      </style>

      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-transparent"
        aria-label="Main site header"
      >
        <div className="flex flex-wrap justify-between items-center max-w-7xl mx-auto px-4 py-3 font-sans text-sm">
          
          {/* Logo */}
          <Link to="/" className="select-none w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
            <h1 className="text-xl font-light tracking-wide">
              <span className="text-[#00008B] font-semibold">SkyHotel</span>
              <span className="text-gray-700">.com</span>
            </h1>
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="relative w-full sm:max-w-md order-last sm:order-none mt-2 sm:mt-0"
            role="search"
            aria-label="Site search"
          >
            <input
              type="search"
              placeholder="Search hotels, cities..."
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:border-blue-700 focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-700 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search input"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-full p-1"
              aria-label="Submit search"
            >
              <FaSearch className="text-lg" />
            </button>
          </form>

          {/* Navigation */}
          <nav className="w-full sm:w-auto mt-3 sm:mt-0">
            <ul className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-5 text-gray-700 font-light select-none">
              <li>
                <Link to="/" className="hover:text-blue-700 transition cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Hotels" className="hover:text-blue-700 transition cursor-pointer">
                  Hotels
                </Link>
              </li>
              <li>
                <Link to="/My/bookings" className="hover:text-blue-700 transition cursor-pointer">
                  Bookings
                </Link>
              </li>
              <li>
                <Link to="/About" className="hover:text-blue-700 transition cursor-pointer">
                  About
                </Link>
              </li>

              {currentUser ? (
                <li className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 hover:text-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-700 rounded"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                    aria-label="User menu"
                  >
                    <span className="capitalize hidden sm:inline">{currentUser.username}</span>
                    <FaCaretDown className={`transition-transform ${userMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                    <img
                      src={currentUser.avatar}
                      alt={`${currentUser.username} avatar`}
                      className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    />
                  </button>

                  {userMenuOpen && (
                    <ul
                      className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg text-gray-700 font-normal z-50"
                      role="menu"
                      aria-label="User submenu"
                    >
                      <li>
                        <Link
                          to="/Profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          role="menuitem"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 focus:bg-red-100 focus:outline-none"
                          role="menuitem"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li>
                  <Link to="/Profile" className="hover:text-blue-700 transition cursor-pointer">
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
