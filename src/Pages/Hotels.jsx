import React, { useEffect, useState } from 'react'
import PropertyList from '../components/PropertyList'

function Hotels() {

  const [hotellist, setHotelList] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional for smooth scrolling
    });

    const fetchHotels = async () => {
      setError(false)
      setLoading(true)
      try {
        // const res = await fetch('/api/listing/get?type:all')

        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/listing/get?type:all`, {
          method: 'GET', // Specify GET method
          headers: {
            'Content-Type': 'application/json', // Optional depending on your API requirements
            'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
          },
        })

        const data = await res.json()

        setHotelList(data)
        setError(false)

        setLoading(false)
        // console.log(data)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }

    }

    fetchHotels()

  }, [])
  return error ? (


    <div className='h-[75vh]  flex justify-center items-center'>
      <div className=''>
        <h1 className='text-3xl font-light text-center mb-8 text-gray-800'>Oops!</h1>
        <p className='text-center font-light text-gray-500'>something went wrong try again later</p>
      </div>
    </div>

  ) : loading ? (
    <div className='h-[75vh]  flex justify-center items-center'>
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#00008B] mb-4"></div>
        <h1 className="text-xl font-light text-gray-700">Loading your bookings...</h1>
        <p className="text-gray-400 font-light text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  ) : (
    <div className='h-auto max max-w-screen-lg mx-auto'>

      <div className='max max-w-6xl mx-auto p-3 flex flex-col'>
        <div className='flex flex-col '>
          <h1 className='text-2xl capitalize font-light mt-11'>Top propertise and Hotels :</h1>
          <p className='mt-2 font-light'>choose Next Stay</p>

          <div className='flex flex-wrap gap-5 mt-12'>
            {
              hotellist.map((list) => (
                <PropertyList listing={list} key={list._id} />
              ))

            }
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hotels
