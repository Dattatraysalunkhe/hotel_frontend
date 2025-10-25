import React from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaMapMarkerAlt, FaParking, FaWifi } from 'react-icons/fa';

function PropertyList({ listing }) {
  return (
    <div className="w-full sm:w-80 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link to={`/listing/${listing._id}`}>
        {/* Image Section */}
        <div className="relative group">
          <img
            src={listing.imageUrl[0]}
            alt={listing.name}
            className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {listing.type === 'rent' && (
            <span className="absolute top-3 left-3 bg-blue-700 font-light text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
              Rent
            </span>
          )}
          {listing.type === 'sale' && (
            <span className="absolute top-3 left-3 bg-green-700 font-light text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide">
              Sale
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-3">
          {/* Hotel Name */}
          <p className="truncate text-lg font-light text-gray-900 tracking-wide group-hover:text-blue-700 transition-colors">
            {listing.name}
          </p>

          {/* Address */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaMapMarkerAlt className="text-blue-600" />
            <p className="truncate font-light">{listing.address}</p>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-gray-600 text-sm mt-2">
            <div className="flex items-center gap-1">
              <FaBed className="text-gray-500" />
              <span className='font-light'>{listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-gray-500" />
              <span className='font-light'>{listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
            </div>
            <div className="flex items-center gap-1">
              {listing.wifi && <FaWifi className="text-blue-600" />}
            </div>
            <div className="flex items-center gap-1">
              {listing.parking && <FaParking className="text-gray-600" />}
            </div>
          </div>

          {/* Price */}
          <div className="mt-3">
            {listing.type === 'rent' && (
              <p className="text-xl font-light text-blue-700">
                ${listing.regularPrice}
                <span className="text-sm text-gray-500 font-light"> / night</span>
              </p>
            )}
            {listing.type === 'sale' && (
              <p className="text-xl font-light text-green-700">
                ${listing.regularPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyList;
