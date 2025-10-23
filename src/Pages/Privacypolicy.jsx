import React from 'react';

const Privacypolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 md:px-24 lg:px-48">
      <h1 className="text-4xl font-thin text-[#00008B] mb-8 border-b" style={{ borderColor: '#00008B' }}>
        Privacy Policy & Disclaimer
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          1. Project and Dummy Data
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          SkyHotel.com is a project learning platform designed solely for educational and demonstration purposes. All data, content, images, and information provided on this website are <strong>dummy data</strong> and do not represent real-world entities or transactions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          2. No Liability
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          By using this website, you acknowledge and agree that SkyHotel.com and its owners <strong>shall not be held liable</strong> for any direct, indirect, incidental, consequential, or punitive damages, including but not limited to legal claims, financial losses, or data inaccuracies arising from the use or misuse of this website or its content.
        </p>
        <p className="text-gray-700 font-light leading-relaxed mt-2">
          You accept full responsibility for any decisions or actions taken based on information found here. This website is not intended for any commercial or transactional use.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          3. Privacy and Email Communication
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          Any personal information you provide, including email addresses, is used solely for communication related to this project and website updates. We do not share, sell, or distribute your information to third parties. You can opt-out of communications at any time.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          4. Cookies
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          This website uses cookies to improve user experience and analyze traffic. By using the site, you consent to the use of cookies. You can disable cookies via your browser settings, but some features may be affected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          5. Legal Protection
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          You agree to indemnify, defend, and hold harmless SkyHotel.com, its owners, and affiliates from and against any claims, liabilities, damages, losses, or expenses, including legal fees, arising out of your use of this website, violation of these terms, or infringement of any rights.
        </p>
        <p className="text-gray-700 font-light leading-relaxed mt-2">
          This disclaimer and privacy policy represent the full agreement between you and SkyHotel.com regarding liability and data usage. If any provision is found unenforceable, the remaining provisions shall remain in effect.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-thin text-[#00008B] mb-3 border-l-4 pl-3" style={{ borderColor: '#00008B' }}>
          6. Contact
        </h2>
        <p className="text-gray-700 font-light leading-relaxed">
          For questions or concerns about this policy or liability disclaimer, please contact us at: <br />
          <a href="mailto:your-email@example.com" className="text-[#00008B] underline">
            your-email@example.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default Privacypolicy;
