import React from 'react';

const Signin = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="bg-[#2a2a2a] text-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
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
          Already have an account? <a href="/login" className="text-green-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
