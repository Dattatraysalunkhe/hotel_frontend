import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaCar,
  FaChair,
  FaMailBulk,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaMobile,
  FaParking,
  FaPhone,
  FaShare,
  FaWhatsapp,
  FaWifi,
} from 'react-icons/fa';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional for smooth scrolling
    });

    const fetchListing = async () => {
      try {
        setLoading(true);
        // const res = await fetch(`/api/listing/get/${params.listingId}`);

        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/listing/get/${params.listingId}`, {
          method: 'GET', // Specify GET method
          headers: {
            'Content-Type': 'application/json', // Optional depending on your API requirements
            'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
          },
        })


        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className=''>



      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className='mt-9'>
          <Swiper navigation>
            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[400px] w=[400px] mx-96 mt-10 rounded-xl '      //h-[400px] w=[400px] mx-96 mt-10 rounded-3xl
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )} */}
          <div className='flex flex-col max-w-4xl mx-auto p-12 my-20 gap-9 item  w-full'>

            <p className='text-2xl font-bold text-center'>
              {listing.name} - ${listing.regularPrice}

              {/* {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'} */}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm '>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-[#00008B] w-full max-w-[200px] text-white text-center p-1 rounded-md font-medium'>
                {listing.type === 'rent' ? `$ ${listing.regularPrice} / Day ` : 'For Sale'}
              </p>
              {/* {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )} */}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaWifi className='text-lg' />
                {listing.wifi ? 'WiFi' : 'No-Wifi'}
              </li>

            </ul>
            {
              currentUser ? (
                <Link className='text-center' to={`/booking/${listing._id}`} >
                  <button className=' p-4 bg-[#00008B] rounded-xl text-white font-medium uppercase hover:opacity-60'>Book Now</button>
                </Link>
              ) : ('')
            }

            {currentUser ? (
              <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-extralight text-gray-800 text-center mb-6 tracking-wide">
                  Contact Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                    <FaMailBulk className="text-blue-500 text-3xl mb-2" />
                    <span className="font-light text-gray-700">{listing.email}</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                    <FaMobile className="text-green-500 text-3xl mb-2" />
                    <span className="font-light text-gray-700">{listing.phonenumber}</span>
                  </div>
                  <div className="flex flex-col items-center bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
                    <FaWhatsapp className="text-green-600 text-3xl mb-2" />
                    <span className="font-light text-gray-700">{listing.whatsapp}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 text-center">
                <h3 className="text-3xl font-light text-gray-700 mb-4">
                  Concierge Access
                </h3>
                <p className="text-gray-500 font-light mb-6">
                  Unlock exclusive details for this luxury property. Sign in to book or connect with our premium concierge service.
                </p>

                <Link to="/sign-in">
                  <button
                    className="mt-4 text-white font-light px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
                    style={{ backgroundColor: '#00008B' }}
                  >
                    Sign In to Book
                  </button>
                </Link>
              </div>

            )}



            {/* {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )} */}
            {/* {contact && <Contact listing={listing} />} */}
          </div>
        </div>
      )}



    </main>
  );
}