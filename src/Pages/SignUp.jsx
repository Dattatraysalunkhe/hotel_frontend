import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero1.jpg'; // same image as SignIn or choose another

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,  // Add your API key here
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
      aria-label="Sign up page background"
    >
      {/* Dark translucent overlay */}
      <div className="absolute inset-0"></div>

      {/* Form container with glassmorphism */}
      <div className="relative z-10 bg-white bg-opacity-90  rounded-3xl shadow-xl max-w-md w-full p-10 flex flex-col">
        <h1 className="text-3xl font-extralight text-black mb-10 text-center tracking-wide drop-shadow-md">
          Create an Account
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            className="border border-gray-300 border-opacity-30 rounded-xl px-4 py-3 text-black placeholder-black placeholder-opacity-70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-light text-sm shadow-sm"
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-gray-300 border-opacity-30 rounded-xl px-4 py-3 text-black placeholder-black placeholder-opacity-70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-light text-sm shadow-sm"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="border border-gray-300 border-opacity-30 rounded-xl px-4 py-3 text-black placeholder-black placeholder-opacity-70 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 font-light text-sm shadow-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 bg-opacity-90 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm tracking-wide transition disabled:opacity-70"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-white font-light text-sm drop-shadow-md">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-400 font-medium hover:underline">
            Sign In
          </Link>
        </p>

        {error && (
          <p
            className="mt-4 text-center text-red-400 font-medium text-sm drop-shadow-md"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
