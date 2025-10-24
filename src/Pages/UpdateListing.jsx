import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import {useSelector} from 'react-redux'
import {useNavigate ,useParams} from 'react-router-dom'

function UpdateListing() {

  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrl: [],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:0,
    discountedPrice:0,
    offer:false,
    parking:false,
    furnished:false,
    wifi:false,
    email:'',
    phonenumber:0,
    whatsapp:0,
  })

  const [imageUploadError, setImageUploadError] = useState(false)
  const[uploading,setUploading] =useState(false)
  const[loading,setLoading] = useState(false)
  const [error, setError] = useState(false);

  const {currentUser} = useSelector((state) => state.user)

  const navigate =useNavigate()

  const params =useParams()

  useEffect(() => {
         const fetchListing = async () => {
                const listingId = params.listingId
                
                const res = await fetch(`/api/listing/get/${listingId}`)

                const data = await res.json()

                if(data.success === false){
                  setError(data.message)
                  return;
                }

                setFormData(data)
                //  console.log(data)
         }
          
         fetchListing();
  },[])

  const handleImageSubmit = (e) => {
    setUploading(true)
    if (files.length > 0 && files.length + formData.imageUrl.length < 4) {

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(
          storeImage(files[i])
        )
      }

      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrl: formData.imageUrl.concat(urls) });
        setImageUploadError(false)
        setUploading(false)
        
      }).catch((error) => {
        setImageUploadError('Upload failed file must be below 2MB')
      })

    } else {
      setImageUploadError('You can only upload less than 3 photos')
      
    }
  }



  const storeImage = async (file) => {

    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )

    })
  }

  const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrl:formData.imageUrl.filter((_,i)=>
                  i !== index,
        )
      })
  }

  const handleChange = (e) => {
    if(e.target.id === 'sale' || e.target.id === 'rent'){
      setFormData({
        ...formData,
        type:e.target.id
      })
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer' || e.target.id === 'wifi'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if(e.target.type ===  'number' || e.target.type === 'text' || e.target.type === 'textarea' || e.target.type === 'email'){            
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      })                                                                    // here we compare all valueinput 
    }

  }

  const handleSubmit = async (e) => {
      e.preventDefault()

       try {
       
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/update/${params.listingId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
          console.log(formData)
        }
       navigate(`/listing/${data._id}`);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
  }

  // console.log(formData)

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-4xl font-medium text-center my-7'>Update Property</h1>

      <form onSubmit={handleSubmit} action="" className='flex flex-col sm:flex-row gap-4'>

        <div className="flex flex-col gap-4 flex-1">
          <input type="text" placeholder='Property Name' id='name' maxLength={50} minLength={2} required className='border p-2 rounded-lg shadow-md' onChange={handleChange} value={formData.name} />
         
          <textarea type="text" placeholder='Add description' id='description' maxLength={500} minLength={2} required className='border p-2 rounded-lg shadow-md' onChange={handleChange} value={formData.description} />
          <input type="text" placeholder='address' id='address' required className='border p-2 rounded-lg shadow-md' onChange={handleChange} value={formData.address} />
          <input type="email" placeholder='email' id='email' required className='border p-2 rounded-lg shadow-md' value={formData.email} onChange={handleChange} />
          <input type="number" placeholder='Phone Number' id='phonenumber' required className='border p-2 rounded-lg shadow-md' value={formData.phonenumber} onChange={handleChange}  />
          <input type="number" placeholder='WhatsNumber' id='whatsapp' required className='border p-2 rounded-lg shadow-md' value={formData.whatsapp} onChange={handleChange}  />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2 '>
              <input type="checkbox" id="sale" className='w-5' onChange={handleChange} checked={formData.type === 'sale'} />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="rent" className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="wifi" className='w-5' onChange={handleChange} checked={formData.wifi} />
              <span>wifi</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="parking" className='w-5' onChange={handleChange} checked={formData.parking} />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="furnished" className='w-5' onChange={handleChange}  checked={formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" id="offer" className='w-5' onChange={handleChange} checked={formData.offer} />
              <span>offer</span>
            </div>
          </div>

          <div className="flex  gap-9 flex-wrap">
            <div className="'flex items-center gap-2">
              <span>Bedroom : </span>
              <input type="Number" id='bedrooms' required minLength={1} maxLength={10} className='p-2 border shadow-sm rounded-md w-20' onChange={handleChange} value={formData.bedrooms} />
            </div>
            <div className="'flex items-center gap-2">
              <span>bathrooms : </span>
              <input type="Number" id='bathrooms' required minLength={1} maxLength={10} className='p-2 border shadow-sm rounded-md w-20' onChange={handleChange} value={formData.bathrooms} />
            </div>
            <div className="'flex items-center gap-2">
              <div>
                <p>regularPrice</p>
                <span className='text-xs'>($/Month)</span>
              </div>

              <input type="Number" id='regularPrice' required  className='p-2 border shadow-sm rounded-md w-20' onChange={handleChange} value={formData.regularPrice} />
            </div>
            <div className="flex gap-2">
              <div className='items-center'>
                <p>discountedPrice</p>
                <span className='text-xs'>($/Month)</span>
              </div>

              <input type="Number" id='discountedPrice' required  className='p-2 border shadow-sm rounded-md w-20' onChange={handleChange} value={formData.discountedPrice} />
            </div>
          </div>


        </div>

        <div className='flex flex-col flex-1 gap-4'>

          <p className='font-semibold' >images: <span className='font-normal text-gray-600 ml-2'>First image will be the Cover Image</span></p>
          <div className='flex gap-4'>
            <input onChange={(e) => { setFiles(e.target.files) }} type="file" id='image' accept='image/*' multiple className='p-3 border rounded-lg' />
            <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 '>{uploading ? 'uploading...' : 'Upload'}</button>

          </div>
          <p className='text-red-700 text-sm'> {imageUploadError && imageUploadError}</p>
          {formData.imageUrl.length > 0 &&
            formData.imageUrl.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                   onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}

          {/* <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Adding Listing ..' : 'Add Listing'}</button> */}

          <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Updating...' : 'Update Property'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}

          

        </div>

      </form>
    </main>
  )
}

export default UpdateListing

