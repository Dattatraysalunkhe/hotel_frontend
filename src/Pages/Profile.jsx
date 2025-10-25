import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserSuccess, deleteUserStart, signoutUserStart, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice'
import { Link } from 'react-router-dom'



function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user)

  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false)
  const [userListings, setUserListings] = useState([])

  const dispatch = useDispatch()


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);



  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: "include", // ✅ this sends cookies
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {

      dispatch(deleteUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));


    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignout = async () => {

    try {

      dispatch(signoutUserStart());
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/signout`);
      const data = await res.json();

      if (data.success === false) {
        dispatch(signoutUserFailure(data.message))
        return;
      }

      dispatch(signoutUserSuccess(data))

    } catch (error) {

    }
  }

  const handleShowListing = async () => {
    try {

      setShowListingError(false)

      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/user/listings/${currentUser._id}`);

      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true)
        return;
      }

      setUserListings(data)

    } catch (error) {
      setShowListingError(true)
    }

  }

 const handleListingDelete = async (listingId) => {
     try {

      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}api/listing/delete/${listingId}`,
      {
        method: 'DELETE'
      }
      )

      const data = await res.json()

      if(data.success === false){
        // console.log((data.message))

        return;

      }

      setUserListings((prev) => 

      prev.filter((listing) => listing.id !== listingId
      
      ))
      
     } catch (error) {
      console.log(error)
     }
 }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-5xl font-medium text-center mt-5'>Profile</h1>        {/* {currentUser.username} */}

      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-6'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} className='hidden' accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover  cursor-pointer self-center mt-2' />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <h1 className='text-2xl font-medium text-center mt-6' >{currentUser.username}</h1>
        <input onChange={handleChange} type='text' placeholder='username' id='username' className='border p-2 rounded-xl ' defaultValue={currentUser.username} />
        <input onChange={handleChange} type='text' placeholder='email' id='email' className='border p-2 rounded-xl ' defaultValue={currentUser.email} />
        <input onChange={handleChange} type='text' placeholder='password' id='password' className='border p-2 rounded-xl ' />

        <button disabled={loading} className='text-white bg-blue-400 p-4 rounded-2xl font-medium uppercase hover:opacity-75'>{loading ? 'Loading' : 'update'}</button>

        <Link className='bg-blue-400 uppercase p-4 roun mt-2 rounded-2xl text-center font-medium text-white' to={'/create-Listing'}>
          Create Listing
        </Link>

      </form>



      <div className='flex justify-between mt-6 font-medium'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer font-medium'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>

      <button onClick={handleShowListing} className='bg-blue-400 p-3  rounded-2xl w-full uppercase font-medium text-slate-50 ' >Listings</button>
      <p>{showListingError ? 'Error listing' : ''}</p>

      {
        userListings && userListings.length > 0 &&
        <div className='flex flex-col gap-2'>
          <h1 className='text-center mt-10 text-3xl font-medium'>Your Properties</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className='mt-7 flex justify-between border p-2 rounded-md shadow-2xl items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrl[0]} alt="LISTING COVER" className='h-15 w-16 object-cover rounded-lg' />
              </Link>
              <Link className='flex-1 ' to={`/listing/${listing._id}`}>
                <p className='font-medium truncate'>{listing.name}</p>
              </Link>
              <div className="flex gap-2">
                <button onClick={() => handleListingDelete(listing._id)} className='bg-red-400 p-2 rounded-md'>Delete</button>
                <Link to={`/update-Listing/${listing._id}`} >
                <button className='bg-green-400 p-2 rounded-md'>Update</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      }

    </div>
  )
}

export default Profile
