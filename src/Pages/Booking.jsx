import React, { useEffect, useState } from 'react'
import { FaBath, FaBed, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaWifi } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
function Booking() {

    const [formData, SetFormData] = useState({
        name: "",
        guest: 1,
        email: "",
        dateForm: "",
        dateTo: "",
        price: 0
    })

    const dispatch = useDispatch()

    const { currentUser } = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const params = useParams()
    const [currentListing, setCurrentListing] = useState({})
    const [price, setPrice] = useState(
        currentListing.regularPrice

    )
    const [first, setFirst] = useState()
    const [second, setSecond] = useState()
    const [pricechange, setPricechange] = useState(formData.price)
    const navigate = useNavigate()

    console.log(params)


    useEffect(() => {
        const fetchlisting = async () => {

            // const res = await fetch(`/api/listing/get/${params.listingId}`);

            const res = await fetch(`/api/listing/get/${params.listingId}`, {
                method: 'GET', // Specify GET method
                headers: {
                    'Content-Type': 'application/json', // Optional depending on your API requirements
                    'x-api-key': import.meta.env.VITE_API_KEY, // Add your API key here
                },
            })

            const data = await res.json();
            setCurrentListing(data)

        }

        fetchlisting()



    }, [params.listingId])


    const handleChange = (e) => {

        if (e.target.type === 'text' || e.target.type === 'email' || e.target.type === 'number' || e.target.type === 'date') {

            SetFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }


    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            setLoading(true);
            setError(false);
            const res = await fetch('/api/booking/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userref: currentUser._id,
                    hotelId: params.listingId,
                    price: pricechange
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                console.log(formData)
            }
            navigate('/My/bookings');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    console.log(currentListing)
    console.log(formData)




    useEffect(() => {

        let numberOfNights = 0;

        let some = 0;


        const one_day = 1000 * 60 * 60 * 24;
        if (formData.dateForm && formData.dateTo) {

            numberOfNights = Math.ceil((new Date(formData.dateTo) - new Date(formData.dateForm)) / (one_day))

            some = (numberOfNights) * (currentListing.regularPrice)
            setPricechange(some)

        }

        console.log(numberOfNights)
        console.log(currentListing.regularPrice)
        console.log(some)

        console.log(pricechange)

    }, [formData.dateTo])










    return (
        <div className='max-w-full mx-auto'>
            <div className='max-w-2xl flex flex-col m-auto gap-8'>
                {/* <div className=''>
                    <h1 className='text-center w-full'>Booking From</h1>
                </div> */}
                <div className='border p-16 mt-16 rounded-2xl bg-transparent shadow-2xl '>
                    <div className=' flex flex-col gap-5 '>
                        <h1 className='text-center w-full text-xl font-medium'>Booking Details</h1>
                        <div className='flex  justify-between'>
                            <div>
                                <div>
                                    <h1 className='text-xl font-medium'>{currentListing.name}</h1>
                                    <p className='flex items-center gap-3' > <FaMapMarkerAlt /> {currentListing.address} </p>
                                </div>
                                <div className='flex gap-5 '>
                                    <div className='flex items-center gap-4 '> {currentListing.wifi === true ? (<FaWifi className='text-green-700' />) : ("")}</div>
                                    <div className='flex items-center gap-4'> <FaBed className='text-green-700' /> {currentListing.bedrooms ? (`${currentListing.bedrooms}`) : ('')} </div>
                                    <div className='flex items-center gap-4'> <FaBath className='text-green-700' /> {currentListing.bathrooms ? (`${currentListing.bathrooms}`) : ('')} </div>
                                    <div className='flex items-center gap-4 '> {currentListing.parking === true ? (<FaParking className='text-green-700' />) : ("")}</div>
                                </div>
                            </div>
                            <div className='mt-7'>
                                <h1 className='text-center '>{currentListing.type === 'rent' ? (`$ ${currentListing.regularPrice} /Day Price`) : (`$ ${currentListing.regularPrice}`)}</h1>
                                <h1 className='text-center font-medium text-xl'>{currentListing.type === 'rent' ? (` Total : $${pricechange} `) : (`$ ${currentListing.regularPrice}`)}</h1>
                                {/* <h1 className='text-center font-medium text-xl'>{currentListing.type === 'rent' ?(`$ ${price} /Day`) : (`$ ${currentListing.regularPrice}`)}</h1> */}
                                {/* todo for change date change price */}
                            </div>
                        </div>

                    </div>
                    <div className='mt-8'>
                        <h1 className='text-center w-full text-xl font-medium'>Booking From</h1>
                    </div>
                    <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <span>FullName</span>
                            <input type="text" placeholder='Name' id='name' value={formData.name} onChange={handleChange} className='border p-3 rounded-xl' />
                        </div>
                        <div className='flex flex-col'>
                            <span>Email</span>
                            <input type="email" placeholder='Enter Email' id='email' value={formData.email} onChange={handleChange} className='border p-3 rounded-xl' />
                        </div>
                        <div className='flex flex-col'>
                            <span>Guest</span>
                            <input type="number" placeholder='Enter Guest Number' id='guest' value={formData.guest} onChange={handleChange} className='border p-3 rounded-xl' />
                        </div>
                        <div className='flex flex-col'>
                            <span>From</span>
                            <input type="date" placeholder='Enter Guest Number' id='dateForm' value={formData.dateForm} onChange={handleChange} className='border p-3 rounded-xl' />
                        </div>
                        <div className='flex flex-col'>
                            <span>To</span>
                            <input type="date" placeholder='Enter Guest Number' id='dateTo' value={formData.dateTo} onChange={handleChange} className='border p-3 rounded-xl' />
                        </div>
                        <button className='border p-3 bg-blue-400 font-medium text-xl text-white hover:opacity-75 rounded-2xl'>Book</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Booking
