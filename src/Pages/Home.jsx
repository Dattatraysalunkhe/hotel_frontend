import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import PropertyList from '../components/PropertyList';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

SwiperCore.use([Navigation]);
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [offer, setOffers] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const heroTitleRef = useRef(null);
  const listingsRef = useRef(null);
  const offersRef = useRef(null);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=all&limit=6');
        const data = await res.json();
        setOffers(data);
        fetchRentListings();
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOfferListings();
  }, []);

  // Animations
  useEffect(() => {
    gsap.from(heroTitleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    if (!listingsRef.current) return;
    const cards = listingsRef.current.querySelectorAll(".animate-card");
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: listingsRef.current,
        start: "top 85%",
      },
    });
  }, [rentListings]);

  useEffect(() => {
    if (!offersRef.current) return;
    const cards = offersRef.current.querySelectorAll(".animate-card");
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: offersRef.current,
        start: "top 85%",
      },
    });
  }, [offer]);

  return (
    <div className="font-sans text-gray-900 bg-[#F5F3F4]">

      {/* Hero Section */}
      <section
        className="relative bg-[url('/images/hero.jpg')] bg-cover bg-center h-screen flex items-center justify-center px-6"
        aria-label="Welcome to Perfect Stay"
      >
        <div className="absolute inset-0 bg-[#FF6B35] bg-opacity-75"></div>
        <div className="relative max-w-3xl text-center text-white drop-shadow-lg">
          <h1
            ref={heroTitleRef}
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-wide"
            style={{ textShadow: '0 0 12px rgba(255,107,53,0.8)' }}
          >
            Find Your <span className="text-[#FFB997]">Dream Vacation Home</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl max-w-xl mx-auto font-light drop-shadow-md">
            Discover luxurious villas, cozy apartments, and exclusive resorts worldwide.
          </p>
          <Link to={currentUser ? '/profile' : '/sign-in'}>
            <button
              className="bg-[#FF6B35] hover:bg-[#e0562b] active:scale-95 transition-transform duration-200 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-[#FF6B35]/60 focus:outline-none focus:ring-4 focus:ring-[#FFB997]"
              aria-label={currentUser ? "Go to your profile" : "Start exploring properties"}
            >
              {currentUser ? 'Go to Profile' : 'Start Exploring'}
            </button>
          </Link>
        </div>
      </section>

      {/* Popular Listings Carousel */}
      {rentListings.length > 0 && (
        <section className="py-16 bg-[#FFF5EE]" aria-label="Popular Listings">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#333333]">Popular Listings</h2>
            <div ref={listingsRef}>
              <Swiper
                navigation
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {rentListings.map(listing => (
                  <SwiperSlide key={listing._id}>
                    <div
                      className="animate-card rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
                      tabIndex={0}
                      aria-label={`Listing: ${listing.name}, located at ${listing.address}`}
                    >
                      <img
                        src={listing.imageUrl[0]}
                        alt={listing.name}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold text-xl mb-1 text-[#333333]">{listing.name}</h3>
                        <p className="text-gray-600 text-sm">{listing.address}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-white" aria-label="Why choose Perfect Stay">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl font-bold mb-12 text-[#333333]">Why Choose Perfect Stay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 px-4">
              <svg className="mx-auto h-12 w-12 text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <h3 className="text-xl font-semibold text-[#333333]">Verified Listings</h3>
              <p className="text-gray-600">Every property is carefully checked to guarantee quality and authenticity.</p>
            </div>
            <div className="space-y-4 px-4">
              <svg className="mx-auto h-12 w-12 text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <h3 className="text-xl font-semibold text-[#333333]">24/7 Customer Support</h3>
              <p className="text-gray-600">We’re here to help anytime, anywhere, for a smooth booking experience.</p>
            </div>
            <div className="space-y-4 px-4">
              <svg className="mx-auto h-12 w-12 text-[#FF6B35]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              <h3 className="text-xl font-semibold text-[#333333]">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive prices with exclusive deals and discounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Properties Grid */}
      {offer.length > 0 && (
        <section className="py-20 bg-[#FFF5EE]" aria-label="Top Properties">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-bold mb-10 text-center text-[#333333]">Top Properties</h2>
            <div
              ref={offersRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {offer.map(listing => (
                <div
                  key={listing._id}
                  className="animate-card rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300"
                  tabIndex={0}
                  aria-label={`Property: ${listing.name}`}
                >
                  <PropertyList listing={listing} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="bg-[#FF6B35] text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-wide drop-shadow-md">Ready to book your next stay?</h2>
        <p className="mb-8 max-w-xl mx-auto font-light drop-shadow-sm">
          Create an account today and enjoy personalized recommendations, easy booking, and exclusive offers.
        </p>
        <Link to={currentUser ? '/profile' : '/sign-in'}>
          <button
            className="bg-white text-[#FF6B35] font-semibold px-8 py-3 rounded-full hover:bg-[#ffe6d6] active:scale-95 focus:outline-none focus:ring-4 focus:ring-white transition"
            aria-label={currentUser ? "Go to Profile" : "Sign In to Start Booking"}
          >
            {currentUser ? 'Go to Profile' : 'Sign In'}
          </button>
        </Link>
      </section>

    </div>
  );
}

export default Home;
