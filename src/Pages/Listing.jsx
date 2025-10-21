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
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
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
                <p className='bg-blue-400 w-full max-w-[200px] text-white text-center p-1 rounded-md font-medium'>
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
                  <button className=' p-4 bg-blue-400 rounded-xl text-white font-medium uppercase hover:opacity-60'>Book Now</button>
                  </Link>
                ) : ('')
              }
              {
                currentUser ? (
                  <div className='mx-auto  bg-blue-400 p-4 rounded-xl mt-10 text-white'>
                    <div >
                      <h5 className='text-center text-2xl font-bold'>Contact Us</h5>
                    </div>
                    <div className='flex justify-center gap-3 mt-2 font-bold'>
                      <div className='flex gap-3 items-center'> <FaMailBulk />:<h1>{listing.email}</h1></div>
                      <div className='flex gap-3 items-center'> <FaMobile />:<h1>{listing.phonenumber}</h1></div>
                      <div className='flex gap-3 items-center'> <FaWhatsapp />:<h1>{listing.whatsapp}</h1></div>
                    </div>
                  </div>

                ) : (

                  <div className='text-center mt-14 flex items-center'>
                    {/* <h3 className='text-xl uppercase text-red-500 font-bold'>please Sign in to See Contact Details</h3> */}
                    <Link className='text-base ' to={'/sign-in'}> <h3 className='text-xl capitalize text-red-500 font-bold'>please Sign in to See Contact Details...Click Here TO Sign in</h3></Link>
                  </div>
                )
              }
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