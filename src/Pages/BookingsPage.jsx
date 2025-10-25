import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BookingsPage() {
    const [bookings, setBookings] = useState([])
    const [listings, setListings] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {


        window.scrollTo({
            top: 0,
            behavior: "smooth", // optional for smooth scrolling
        });

        const fetchBookings = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/booking/booking`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': import.meta.env.VITE_API_KEY,
                    },
                    credentials: 'include', // ✅ This tells the browser to send cookies
                })

                const data = await res.json()
                setBookings(data)

                // Fetch hotel details
                const hotelIds = data.map(b => b.hotelId)
                const uniqueIds = [...new Set(hotelIds)]
                const listingsData = {}

                await Promise.all(
                    uniqueIds.map(async (id) => {
                        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/listing/get/${id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': import.meta.env.VITE_API_KEY,
                            },
                        })
                        const hotel = await res.json()
                        listingsData[id] = hotel
                    })
                )

                setListings(listingsData)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error)
            }
        }

        fetchBookings()
    }, [])

    // Cancel Booking
    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/booking/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_API_KEY,
                },
            })

            if (res.ok) {
                // Remove canceled booking from state
                setBookings(prev => prev.filter(b => b._id !== bookingId))
                alert("Booking canceled successfully!")
            } else {
                alert("Failed to cancel booking. Please try again.")
            }
        } catch (error) {
            console.log(error)
            alert("Error canceling booking. Try again later.")
        }
    }

    if (loading) return (

        // <div className='h-[75vh] flex justify-center items-center'>
        //     <p className="text-center mt-10">Loading...</p>
        // </div>

        <div className='h-[75vh]  flex justify-center items-center'>
            <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#00008B] mb-4"></div>
                <h1 className="text-xl font-semibold text-gray-700">Loading your bookings...</h1>
                <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
            </div>
        </div>

    )

    return (
        <div className='max-w-screen-lg mx-auto px-4 py-8'>


            {error ? (
                <div className='h-[75vh] flex justify-center items-center'>
                    <div>
                        <h1 className='text-3xl font-semibold text-center mb-8 text-gray-800'>Oops!</h1>
                        <p className='text-center text-gray-500'>something went wrong try again later</p>
                    </div>
                </div>
            ) : bookings.length === 0 ? (
                <div className='text-center'>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
                    <p className="text-gray-500 max-w-xs mx-auto">
                        You haven’t made any bookings yet. Explore our premium hotels and secure your stay with SkyHotel today!
                    </p>
                    <Link to={"/Hotels"}>
                        <button className="mt-6 bg-[#00008B] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Explore Hotels
                        </button>
                    </Link>
                </div>
            ) : (
                <div>
                    <h1 className='text-3xl font-semibold text-center mb-8 text-gray-800'>My bookings</h1>
                    <div className='grid md:grid-cols-2 gap-6'>
                        {bookings.map((book) => {
                            const hotel = listings[book.hotelId]

                            return (
                                <div
                                    key={book._id}
                                    className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 border border-gray-100'
                                >
                                    {/* Hotel Info */}
                                    {hotel && (
                                        <div className='mb-4'>
                                            <h2 className='text-xl font-medium text-gray-800'>{hotel.name}</h2>
                                            <p className='text-gray-600 mb-2'>{hotel.address}</p>
                                            {hotel.imageUrl?.[0] && (
                                                <img
                                                    src={hotel.imageUrl[0]}
                                                    alt={hotel.name}
                                                    className='rounded-lg w-full h-48 object-cover mb-2'
                                                />
                                            )}
                                            <div className='flex gap-3 text-gray-700 mb-2'>
                                                <span>🛏 {hotel.bedrooms} Beds</span>
                                                <span>🛁 {hotel.bathrooms} Baths</span>
                                                {hotel.wifi && <span>📶 WiFi</span>}
                                                {hotel.parking && <span>🅿️ Parking</span>}
                                            </div>
                                        </div>
                                    )}

                                    {/* Booking Info */}
                                    <div className='flex flex-col gap-2 text-gray-600'>
                                        <p>
                                            <span className='font-semibold text-gray-700'>Guest(s): </span>
                                            {book.guest}
                                        </p>
                                        <p>
                                            <span className='font-semibold text-gray-700'>Email: </span>
                                            {book.email}
                                        </p>
                                        <p>
                                            <span className='font-semibold text-gray-700'>Booking Dates: </span>
                                            {book.dateForm} → {book.dateTo}
                                        </p>
                                        <p>
                                            <span className='font-semibold text-gray-700'>Price: </span>${book.price}
                                        </p>
                                    </div>

                                    <div className='mt-4 flex justify-between items-center'>
                                        <span className='text-sm text-gray-400'>
                                            Booked on {new Date(book.createdAt).toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={() => handleCancel(book._id)}
                                            className='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300'
                                            title="Request to cancel your booking"
                                        >
                                            Request Cancellation
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookingsPage
