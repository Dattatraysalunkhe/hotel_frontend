import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import heroImage from '../assets/hero1.jpg'; // Adjust path as needed

function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/auth/signin`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' ,
          'x-api-key': import.meta.env.VITE_API_KEY,  // Add your API key here

        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
      aria-label="Sign in page background"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0"></div>

      {/* Form container */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-3xl shadow-xl max-w-md w-full p-10 flex flex-col">
        <h1 className="text-3xl font-extralight text-gray-800 mb-10 text-center tracking-wide">
          Welcome Back
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light text-sm shadow-sm"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="border border-gray-300 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-light text-sm shadow-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm tracking-wide hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 font-light text-sm">
          Don’t have an account?{' '}
          <Link to="/Sign-up" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-center text-red-600 font-medium text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default SignIn
