import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 font-light py-12 mt-32">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>
          <Link to="/" className="text-white text-2xl font-semibold tracking-wide">
            SkyHotel.com
          </Link>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Your trusted platform to find and book dream vacation homes worldwide. Luxury, comfort, and affordability at your fingertips.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-sm font-semibold uppercase mb-4 tracking-wide">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="#" className="hover:text-white">Careers</Link></li>
            <li><Link to="#" className="hover:text-white">Press</Link></li>
            <li><Link to="#" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white text-sm font-semibold uppercase mb-4 tracking-wide">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-white">Help Center</Link></li>
            <li><Link to="#" className="hover:text-white">Cancellation Options</Link></li>
            <li><Link to="#" className="hover:text-white">Neighborhood Support</Link></li>
            <li><Link to="#" className="hover:text-white">Trust & Safety</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white text-sm font-semibold uppercase mb-4 tracking-wide">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white">Cookies Policy</Link></li>
            <li><Link to="#" className="hover:text-white">Accessibility</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SkyHotel.com — All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
