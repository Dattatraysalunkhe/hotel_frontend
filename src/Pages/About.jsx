import React, { useEffect } from 'react';

function About() {

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional for smooth scrolling
    });

  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 min-h-screen">
      <h1 className="text-4xl font-thin text-[#00008B] text-center mb-12">
        About SkyHotel.com
      </h1>

      <p className="text-gray-700 font-light leading-relaxed mb-6">
        Welcome to <span className="font-semibold text-[#00008B]">SkyHotel.com</span>, your go-to project learning platform designed to simulate real-world hotel booking operations. Our website is built to help developers, students, and enthusiasts gain hands-on experience with web development in a practical and engaging way.
      </p>

      <p className="text-gray-700 font-light leading-relaxed mb-6">
        All data, including hotel details, bookings, and images, are <em className="italic font-semibold">dummy data</em> used purely for educational and demonstration purposes. We do not represent or operate any actual hotels or services.
      </p>

      <p className="text-gray-700 font-light leading-relaxed mb-6">
        Our mission is to empower learners by providing a realistic project environment to experiment, build, and improve their coding skills. Whether you are a beginner or an advanced developer, SkyHotel.com offers a valuable platform for growth and practice.
      </p>

      <p className="text-gray-700 font-light leading-relaxed mb-6">
        We are committed to maintaining transparency, and we encourage users to understand that this site is not intended for commercial or transactional use. All emails or personal information collected are solely for project-related communication and are never shared with third parties.
      </p>

      <p className="text-gray-700 font-light leading-relaxed">
        Thank you for visiting SkyHotel.com! If you have any questions or feedback, feel free to <a href="mailto:your-email@example.com" className="text-[#00008B] underline">contact us</a>.
      </p>
    </div>
  );
}

export default About;
