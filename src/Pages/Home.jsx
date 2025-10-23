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
import heroImage from '../assets/hero1.jpg'; // Adjust path as needed


SwiperCore.use([Navigation]);
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [loading, setLoading] = useState(false)
  const [offer, setOffers] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const heroTitleRef = useRef(null);
  const listingsRef = useRef(null);
  const offersRef = useRef(null);

  useEffect(() => {
    // const fetchOfferListings = async () => {
    //   try {
    //     // const res = await fetch('/api/listing/get?type=all&limit=6');
    //     const res = await fetch('/api/listing/get?type=all&limit=6', {
    //       method: 'GET', // Specify GET method
    //       headers: {
    //         'Content-Type': 'application/json', // Optional depending on your API requirements
    //         'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
    //       },
    //     })

    //     const data = await res.json();
    //     setOffers(data);
    //     fetchRentListings();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // const fetchRentListings = async () => {
    //   try {
    //     // const res = await fetch('/api/listing/get?type=sale&limit=4');
    //     const res = await fetch('/api/listing/get?type=sale&limit=4', {
    //       method: 'GET', // Specify GET method
    //       headers: {
    //         'Content-Type': 'application/json', // Optional depending on your API requirements
    //         'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
    //       },
    //     })
    //     const data = await res.json();
    //     setRentListings(data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchOfferListings();


    const fetchData = async () => {
      setLoading(true)

      try {
        // const res = await fetch('/api/listing/get?type=all&limit=6');
        const res = await fetch('/api/listing/get?type=all&limit=6', {
          method: 'GET', // Specify GET method
          headers: {
            'Content-Type': 'application/json', // Optional depending on your API requirements
            'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
          },
        })

        const data = await res.json();
        setOffers(data);
      } catch (error) {
        console.error(error);
        // setLoading(false)
      }

      try {
        // const res = await fetch('/api/listing/get?type=sale&limit=4');
        const res = await fetch('/api/listing/get?type=sale&limit=4', {
          method: 'GET', // Specify GET method
          headers: {
            'Content-Type': 'application/json', // Optional depending on your API requirements
            'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
          },
        })
        const data = await res.json();
        setRentListings(data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        // setLoading(false)
      }

    }

    fetchData()



  }, []);

  // Hero title animation
  useEffect(() => {
    gsap.from(heroTitleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  // Listings carousel cards animation
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

  // Offers grid animation
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

  return loading ? (
    <div className="flex items-center justify-center h-screen bg-[#E7EFF9] text-[#1A1F35] font-sans text-xl">
      Loading....
    </div>
  ) : (

    <div className="font-sans bg-[#E7EFF9] text-[#1A1F35]">

      {/* Hero Section */}
      <section
        className="relative bg-[url('/images/hero1.jpg')] bg-cover bg-center h-screen flex items-center justify-center px-6"
        aria-label="Welcome to Perfect Stay"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0  bg-opacity-80"></div>
        <div className="relative max-w-3xl text-center text-[#F0F4FA] drop-shadow-lg">
          <h1
            ref={heroTitleRef}
            className="text-5xl md:text-6xl font-extralight leading-tight mb-6 tracking-wide"
            style={{ textShadow: '0 0 16px rgba(0,0,139,0.9)' }}
          >
            Discover Your <span className="text-[#90E0EF] font-light">Luxury Escape</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl max-w-xl mx-auto font-light drop-shadow-md tracking-wide">
            Hand‑picked villas, exclusive resorts and sophisticated stays worldwide.
          </p>
          <Link to={currentUser ? '/profile' : '/sign-in'}>
            <button
              className="bg-[#00008B] hover:bg-[#111184] active:scale-95 transition-transform duration-200 text-[#F0F4FA] px-8 py-3 rounded-full font-light shadow-lg shadow-[#00008B]/50 focus:outline-none focus:ring-4 focus:ring-[#90E0EF]"
              aria-label={currentUser ? "Go to Profile" : "Start exploring properties"}
            >
              {currentUser ? 'Go to Profile' : 'Start Exploring'}
            </button>
          </Link>
        </div>
      </section>

      {/* Popular Listings Carousel */}
      {rentListings.length > 0 && (
        <section className="py-16 bg-[#F4FAFF]" aria-label="Popular Listings">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-light mb-8 text-center text-[#111144] tracking-wide">Featured Stays</h2>
            <p className="text-center max-w-2xl mx-auto mb-12 font-light text-[#2A3B66] tracking-wide">
              Curated homes combining comfort and elegance for your next getaway.
            </p>
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
                      className="animate-card rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg bg-[#FFFFFF]">
                      <img
                        src={listing.imageUrl[0]}
                        alt={listing.name}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4 bg-[#F4FAFF]">
                        <h3 className="font-light text-xl mb-1 text-[#1A1F35]">{listing.name}</h3>
                        <p className="text-[#2A3B66] text-sm">{listing.address}</p>
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
      <section className="py-20 bg-[#FFFFFF]" aria-label="Why Choose Perfect Stay">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl font-light mb-12 text-[#111144] tracking-wide">Why Choose Perfect Stay?</h2>
          <p className="mb-10 max-w-xl mx-auto font-light text-[#2A3B66] tracking-wide">
            Premium stays, meticulous service and unforgettable experiences. Your deserves everything.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 px-4">
              <svg className="mx-auto h-12 w-12 text-[#00008B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <h3 className="text-xl font-light text-[#1A1F35]">Curated Portfolio</h3>
              <p className="text-[#2A3B66] font-light">Each property is selected for elegance, comfort and experience.</p>
            </div>
            <div className="space-y-4 px-4">
              <svg className="mx-auto h-12 w-12 text-[#00008B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <h3 className="text-xl font-light text-[#1A1F35]">24/7 Premium Support</h3>
              <p className="text-[#2A3B66] font-light">Dedicated service every step of your stay.</p>
            </div>
            <div className="space-y-4 px-4">
              <svg className="mx-auto h-12 w-12 text-[#00008B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8‑8H4" /></svg>
              <h3 className="text-xl font-light text-[#1A1F35]">Exclusive Value</h3>
              <p className="text-[#2A3B66] font-light">Unbeatable service with unmatched value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Properties Grid */}
      {offer.length > 0 && (
        <section className="py-20 bg-[#F4FAFF]" aria-label="Top Properties">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-4xl font-light mb-10 text-center text-[#111144] tracking-wide">Top Properties</h2>
            <p className="text-center max-w-3xl mx-auto mb-12 font-light text-[#2A3B66] tracking-wide">
              Explore our hand‑picked collection of extraordinary stays.
            </p>
            <div
              ref={offersRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {offer.map(listing => (
                <div
                  key={listing._id}
                  className="animate-card rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 bg-[#FFFFFF]">
                  <PropertyList listing={listing} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="bg-[#00008B] text-[#F0F4FA] py-16 text-center px-6">
        <h2 className="text-3xl font-light mb-4 tracking-wide drop-shadow-md">Ready to experience the exceptional?</h2>
        <p className="mb-8 max-w-xl mx-auto font-light drop-shadow-sm tracking-wide">
          Join our membership today and unlock exclusive stays, priority booking and elite services.
        </p>
        <Link to={currentUser ? '/profile' : '/sign-in'}>
          <button
            className="bg-[#F0F4FA] text-[#00008B] font-light px-8 py-3 rounded-full hover:bg-[#E1E7F5] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#90E0EF] transition"
            aria-label={currentUser ? "Go to Profile" : "Join Now"}
          >
            {currentUser ? 'Go to Profile' : 'Join Now'}
          </button>
        </Link>
      </section>

    </div>
  );
}

export default Home;
