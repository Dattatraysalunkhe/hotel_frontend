import React from 'react'
import { Link } from 'react-router-dom'
import { FaBath, FaBed, FaMapMarker, FaMapMarkerAlt, FaParking, FaWifi } from 'react-icons/fa'

function PropertyList({ listing }) {
    
    return (
        <div className='hover:shadow-2xl transition-shadow rounded-xl w-80 border '>

            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrl[0]} alt="listing cover" className='h-[200px] object-cover w-full hover:scale-95 transition-scale duration-300 rounded-xl' />
                <div className='p-3 '>
                    <p className='truncate font-medium text-xl'>
                        {listing.name}
                    </p>
                    <div className='flex items-center gap-1 whitespace-nowrap '>

                        <FaMapMarkerAlt className='text-green-600'/>
                        <p className='truncate font-normal text-sm'>{listing.address}</p>


                    </div>

                    {/* <p className='font-medium'>{listing.type === 'rent' && (
                        ` $${listing.regularPrice} /month`
                    )}</p>
                    <p>{listing.type === 'sale' && (
                        `$${listing.regularPrice}`
                    )}</p> */}

                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-3'>
                            <FaBed />
                            {listing.bedrooms > 1 ? `${listing.bedrooms}` : 'bed'}
                        </div>
                        <div className='flex items-center gap-3'>
                            <FaBath />
                            {listing.bathrooms > 1 ? `${listing.bathrooms}` : 'bathrooms'}
                        </div>
                        <div className='flex items-center gap-3'>

                            {listing.wifi === true ? <FaWifi className='text-green-600' /> : ''}
                        </div>
                        <div className='flex items-center gap-3'>

                            {listing.parking === true ? <FaParking /> : ''}
                        </div>

                    </div>
                    <div className='items-center'>
                        <p className='font-semibold'>{listing.type === 'rent' && (
                            ` $${listing.regularPrice} /Day`
                        )}</p>
                        <p className='font-semibold' >{listing.type === 'sale' && (
                            `$${listing.regularPrice}`
                        )}</p>

                    </div>
                </div>

            </Link>

        </div>
    )
}

export default PropertyList
