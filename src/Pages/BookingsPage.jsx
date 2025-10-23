import React, { useEffect, useState } from 'react'


function BookingsPage() {

    const [bookings, setBookings] = useState([])
    const [currentlisting, setCurrentlistings] = useState()


    useEffect(() => {

        const fetchbookings = async () => {
            try {

                // const res = await fetch('/api/booking/booking');

                const res = await fetch('/api/booking/booking', {
                    method: 'GET', // Specify GET method
                    headers: {
                        'Content-Type': 'application/json', // Optional depending on your API requirements
                        'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
                    },
                })

                const data = await res.json()

                setBookings(data)




            } catch (error) {
                console.log(error)
            }
        }

        fetchbookings()

    }, [])


    return (


        <div className='max-w-screen-lg mx-auto' >
            {

            }
            <div className='max-w-xl flex flex-col mx-auto'>
                <div>
                    <h1 className='text-2xl font-medium text-center m-auto '>Bookings</h1>
                </div>
                <div>
                    {
                        bookings.map((book, id) => (
                            <div key={id}>
                                <div>
                                    <h1>{book.name}</h1>
                                    <h1>{ }</h1>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BookingsPage
