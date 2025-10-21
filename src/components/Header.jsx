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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Parse searchTerm from URL on mount and when location changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    setSearchTerm(searchTermFromUrl);
  }, [window.location.search]); // This is fine, though React may warn - usually you can use a location hook

  useEffect(() => {
    // Animate header background & shadow on scroll
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top top",
      end: 99999,
      toggleClass: { targets: headerRef.current, className: "bg-white shadow-md" },
      onEnter: () => gsap.to(headerRef.current, { backgroundColor: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", duration: 0.3 }),
      onLeaveBack: () => gsap.to(headerRef.current, { backgroundColor: "transparent", boxShadow: "none", duration: 0.3 }),
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
    navigate('/'); // Redirect to home or sign-in after logout
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b transition-colors duration-300 bg-transparent">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3 font-sans text-sm">
        {/* Logo */}
        <Link to="/" className="select-none">
          <h1 className="text-xl font-light tracking-wide">
            <span className="text-blue-500 font-semibold">Sky</span>
            <span className="text-gray-700">.com</span>
          </h1>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-gray-100 rounded-full px-3 py-1 shadow-inner max-w-full sm:max-w-md"
          role="search"
          aria-label="Site search"
        >
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none text-sm px-2 text-gray-700 w-24 sm:w-48 md:w-full placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search input"
          />
          <button type="submit" className="text-gray-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1" aria-label="Submit search">
            <FaSearch className="text-sm" />
          </button>
        </form>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-5 text-gray-700 font-light select-none">
            <li><Link to="/" className="hover:text-blue-500 transition cursor-pointer">Home</Link></li>
            <li><Link to="/Hotels" className="hover:text-blue-500 transition cursor-pointer">Hotels</Link></li>
            <li><Link to="/My/bookings" className="hover:text-blue-500 transition cursor-pointer">Bookings</Link></li>
            <li><Link to="/About" className="hover:text-blue-500 transition cursor-pointer">About</Link></li>

            {/* Profile / User menu */}
            {currentUser ? (
              <li className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 hover:text-blue-500 transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                  aria-label="User menu"
                >
                  <span className="capitalize">{currentUser.username}</span>
                  <FaCaretDown className={`transition-transform ${userMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.username} avatar`}
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                </button>

                {/* Dropdown menu */}
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
              <li><Link to="/Profile" className="hover:text-blue-500 transition cursor-pointer">Sign In</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
