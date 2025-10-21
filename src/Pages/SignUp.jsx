import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignUp() {

  const [formData, setFormData] = useState({})
  const[error,setError] =useState(null)
  const[loading,setLoading]=useState(false)
  const navigate =useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true)
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false)
    setError(null)
    navigate('/sign-In')
      
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
    
      
  }

 

  return (
    <div className='p-3 max-w-lg mx-auto mt-52'>
      <h1 className='text-2xl text-center font-medium mb-16'>SignUp</h1>
      <form className='flex flex-col gap-6 ' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' className='border p-2 rounded-xl shadow-md' id='username' onChange={handleChange} />
        <input type='email' placeholder='Email' className='border p-2 rounded-xl shadow-md' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-2 rounded-xl shadow-md' id='password' onChange={handleChange} />
        <button disabled={loading} className='p-3 text-slate-100 bg-blue-400 hover:text-slate-100 font-medium  rounded-xl uppercase hover:opacity-75 disabled:opacity-80'>
          {loading ? 'Loading' : 'Sign Up'}
          </button>
      </form>
      <div className='flex gap-3 mt-8'>
        <p className='font-medium'>Have an Account..?</p>
        <Link to='/Sign-In'>
          <span className='text-blue-800 font-medium'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default SignUp
