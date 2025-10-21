import React, { useEffect, useState } from 'react'
import PropertyList from '../components/PropertyList'

function Hotels() {

    const [hotellist,setHotelList]=useState([])
    const [error,setError]=useState(false)

    useEffect(() => {

       const fetchHotels = async () => {
        setError(false)
          try {
            const res = await fetch('/api/listing/get?type:all')
  
            const data = await res.json()
  
            setHotelList(data)
            setError(false)
  
            console.log(data)
          } catch (error) {
               console.log(error)
               setError(true)
          }
          
       }

       fetchHotels()

    },[])
  return (
    <div className='max max-w-screen-lg mx-auto'>

        <div className='max max-w-6xl mx-auto p-3 flex flex-col'>
            <div className='flex flex-col '>
                <h1 className='text-2xl capitalize font-medium mt-11'>Top propertise and Hotels :</h1>
                <p className='mt-2'>choose Next Stay</p>

                <div className='flex flex-wrap gap-5 mt-12'>
                   {
                    hotellist.map((list) => (
                        <PropertyList listing={list} key={list._id} />
                    ) )
                  
                   }
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Hotels
