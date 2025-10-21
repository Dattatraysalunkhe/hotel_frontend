import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart ,signInSuccess,signInFailure } from '../redux/user/userSlice'

function SignIn() {
  const [formData, setFormData] = useState({})
 const {loading ,error} = useSelector((state) => state.user)
  const navigate =useNavigate()

  

  const dispatch=useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      dispatch(signInStart())
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(data.success === false){
      dispatch(signInFailure(data.message))
      return;
    }
    dispatch(signInSuccess(data))
    console.log(data)
    navigate('/')
      
    } catch (error) {
      
      dispatch(signInFailure(error.message));
    }
    
      
  }

  

  return (
    <div className='p-3 max-w-lg mx-auto mt-52'>
      <h1 className='text-2xl text-center font-medium mb-16'>Sign In</h1>
      <form className='flex flex-col gap-6 ' onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' className='border p-2 rounded-xl shadow-md' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-2 rounded-xl shadow-md' id='password' onChange={handleChange} />
        <button disabled={loading} className='p-3 text-slate-100 bg-blue-400 hover:text-slate-100 font-medium  rounded-xl uppercase hover:opacity-75 disabled:opacity-80'>
          {loading ? 'Loading' : 'Sign In'}
          </button>
      </form>
      <div className='flex gap-3 mt-8'>
        <p className='font-medium'>Craete an Account..?</p>
        <Link to='/Sign-up'>
          <span className='text-blue-800 font-medium'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default SignIn
