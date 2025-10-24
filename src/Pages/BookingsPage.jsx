import React, { useEffect, useState } from 'react'

function BookingsPage() {
    const [bookings, setBookings] = useState([])
    const [listings, setListings] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('/api/booking/booking', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': import.meta.env.VITE_API_KEY,
                    },
                })

                const data = await res.json()
                setBookings(data)

                // Fetch hotel details
                const hotelIds = data.map(b => b.hotelId)
                const uniqueIds = [...new Set(hotelIds)]
                const listingsData = {}

                await Promise.all(
                    uniqueIds.map(async (id) => {
                        const res = await fetch(`/api/listing/get/${id}`, {
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
            }
        }

        fetchBookings()
    }, [])

    // Cancel Booking
    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return

        try {
            const res = await fetch(`/api/booking/${bookingId}`, {
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

    if (loading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className='max-w-screen-lg mx-auto px-4 py-8'>


            {bookings.length === 0 ? (
                <div>
                    <h1 className='text-3xl font-semibold text-center mb-8 text-gray-800'>Oops!</h1>
                    <p className='text-center text-gray-500'>something went wrong try again later</p>
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
