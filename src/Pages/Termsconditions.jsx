import React, { useEffect } from 'react';

const Termsconditions = () => {

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional for smooth scrolling
    });

  },[])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 md:px-24 lg:px-48">
      <h1 className="text-4xl font-thin text-[#00008B] mb-8 border-b" style={{ borderColor: '#00008B' }}>
        Terms and Conditions
      </h1>

      <p className="text-gray-700 font-light mb-6">
        Welcome to <span className="font-semibold text-[#00008B]">SkyHotel.com</span>!
      </p>

      <p className="mb-6 text-gray-600 font-light leading-relaxed">
        SkyHotel.com (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a project learning website designed for educational purposes and real-world operation simulations. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          1. Project Learning and Dummy Data
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          SkyHotel.com is intended solely for project learning and demonstration purposes. All data presented on this website, including hotel information, bookings, images, and other content, are <span className="italic font-semibold">dummy data</span> created for simulation only. The photos and images used on this website are sourced from pixel libraries and are not representative of actual properties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          2. No Liability
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          We do <span className="font-semibold">not</span> accept any liability for the accuracy, completeness, or authenticity of any data or content provided on the site. The website is not intended for commercial use or any real-world transactions. You acknowledge and agree that any reliance on the information provided on SkyHotel.com is at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          3. Email Communication
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          If you provide your email address for communication or project purposes, you agree to receive emails related to your project usage and website updates. We will not use your email for marketing or third-party purposes. You may unsubscribe from such communications at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          4. Cookies
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          SkyHotel.com uses cookies to enhance your browsing experience. Cookies help us analyze website traffic and improve our services. By continuing to use the site, you consent to our use of cookies as described in our Cookie Policy. You may disable cookies through your browser settings, but this may affect website functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          5. Intellectual Property
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          All content, including text, images, logos, and design elements, are the intellectual property of SkyHotel.com or its content providers. Unauthorized use, reproduction, or distribution of any material from this site is prohibited.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          6. Changes to Terms
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          We reserve the right to modify these terms and conditions at any time without prior notice. It is your responsibility to review this page regularly for updates.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          7. Contact
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          If you have any questions or concerns regarding these terms, please contact us at: <br />
          <a href="mailto:your-email@example.com" className="text-[#00008B] underline">
            your-email@example.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default Termsconditions;
