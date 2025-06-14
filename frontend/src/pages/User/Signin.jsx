import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://social-media-app-o3tu.onrender.com/user/register', formData);
      // console.log(res);
      if (res.data.result) {
        localStorage.setItem('user', JSON.stringify(res.data.result));
        toast.success("Registration successful!");
        navigate('/'); // redirect to home or dashboard
      } else if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.error("Unexpected server response.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-[#2a2a2a] text-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 transition rounded-xl font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <a href="/user/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
