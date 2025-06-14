import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router';
import { FaHome, FaUserFriends, FaBell, FaUser } from 'react-icons/fa';

const Layout = () => {
  let user=JSON.parse(localStorage.getItem("user"));
  let navigate=useNavigate();
  return (
    <div className="bg-[#0f0f0f] text-gray-200 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#1a1a1a] border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
  <Link to="/" className="text-green-400 text-2xl font-bold">
    Devgram
  </Link>
  <div className="flex items-center gap-4">
    <Link to="/friends" className="hover:text-cyan-400 transition-colors">
      <FaUserFriends size={20} />
    </Link>
    <Link to="/notifications" className="hover:text-cyan-400 transition-colors">
      <FaBell size={20} />
    </Link>

    {user ? (
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium"
        >
          Logout
        </button>
        <Link to="/profile" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
          <FaUser size={18} />
          <span className="text-sm">{user.userName}</span>
        </Link>
      </div>
    ) : (
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/user/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/user/signin')}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium"
        >
          Sign Up
        </button>
      </div>
    )}
  </div>
</nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-[#1a1a1a] border-r border-zinc-800 p-6 space-y-6">
          <Link to="/" className="text-gray-400 hover:text-green-400 transition-colors">Home</Link>
          <Link to="/explore" className="text-gray-400 hover:text-green-400 transition-colors">Explore</Link>
          <Link to="/messages" className="text-gray-400 hover:text-green-400 transition-colors">Messages</Link>
          <Link to="/settings" className="text-gray-400 hover:text-green-400 transition-colors">Settings</Link>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-zinc-800 text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Devgram — Built for Developers
      </footer>
    </div>
  );
};

export default Layout;
