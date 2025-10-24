import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
    const [searchData, setSearchData] = useState({
        searchTerm: '',
        type: 'all',
        wifi: false,
        parking: false,
        furnished: false,
        sort: 'craeted_at',
        order: 'desc'
    })

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);
  

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);

        const searchTermFromUrl = urlParams.get('searchTerm')
        const wifiFromUrl = urlParams.get('wifi')
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            wifiFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
          ) {
            setSearchData({
              searchTerm: searchTermFromUrl || '',

              parking: parkingFromUrl === 'true' ? true : false,
              furnished: furnishedFromUrl === 'true' ? true : false,
              offer: offerFromUrl === 'true' ? true : false,
              sort: sortFromUrl || 'created_at',
              order: orderFromUrl || 'desc',
            })
        }


        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
            setListings(data);
            setLoading(false);
            // console.log(data)
          };
      
          fetchListings();

    },[location.search])

    

    const handleChange = (e) => {

        if (e.target.id === 'all' || e.target.id === 'sale' || e.target.id === 'rent') {
            setSearchData({
                ...searchData,
                type: e.target.id
            })
        }

        if (e.target.id === 'searchTerm') {
            setSearchData({
                ...searchData,
                searchTerm: e.target.value
            })
        }

        if (e.target.id === 'wifi' || e.target.id === 'parking' || e.target.id === 'furnished') {
            setSearchData({
                ...searchData,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false
            })
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_') || 'desc'
            setSearchData({
                ...searchData,
                sort, order
            })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()             //get data to the seah bar and also url that why this use
        urlParams.set('type', searchData.type)             //set type = searchData.type  already in searchData  ('name',this value)
        urlParams.set('parking', searchData.parking)
        urlParams.set('wifi', searchData.wifi)
        urlParams.set('furnished', searchData.furnished)
        urlParams.set('sort', searchData.sort)
        urlParams.set('order', searchData.order)

        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)

    }




    return (
        <div className='flex flex-col w-full items-center'>
            <div>
                <form onSubmit={handleSubmit} action="" className='flex flex-col gap-6'>
                    <div>
                        <label htmlFor="">search term</label>
                        <input type="text" id='searchTerm' placeholder='Search' className='border p-2 rounded-lg ' value={searchData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className='flex gap-3 flex-wrap'>
                        <label htmlFor="">Type :</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='all' className='w-5' checked={searchData.type === 'all'} onChange={handleChange} />
                            <span>Rent & sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' checked={searchData.type === 'rent'} onChange={handleChange} />
                            <span>sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sale' className='w-5' checked={searchData.type === 'sale'} onChange={handleChange} />
                            <span>Rent</span>
                        </div>
                    </div>
                    <div className='flex gap-3 flex-wrap'>
                        <label htmlFor="">facilities :</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='wifi' className='w-5' checked={searchData.wifi} onChange={handleChange} />
                            <span>wifi</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' checked={searchData.parking} onChange={handleChange} />
                            <span>parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' checked={searchData.furnished} onChange={handleChange} />
                            <span>furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="">Sort</label>
                        <select onChange={handleChange} defaultValue={'created_at_desc'} name="" id="sort_order">
                            <option value="regularPrice_desc">Price High To Low</option>
                            <option value="regularPrice_asc">Price  Low to High</option>
                            <option value="created_desc"> latest </option>
                        </select>
                    </div>

                    <button className='bg-blue-400 p-2 rounded-xl hover:opacity-70 text-white font-medium'>Search</button>
                </form>
            </div>
            <div>
                <h1 className='text-2xl uppercase font-medium mt-8'>result</h1>
            </div>
        </div>
    )
}

export default Search
