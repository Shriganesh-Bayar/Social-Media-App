import React from 'react';
import { Outlet, Link } from 'react-router';
import { FaHome, FaUserFriends, FaBell, FaUser } from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="bg-[#0f0f0f] text-gray-200 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-[#1a1a1a] border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-green-400 text-2xl font-bold">
          Devgram
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-cyan-400 transition-colors">
            <FaHome size={20} />
          </Link>
          <Link to="/friends" className="hover:text-cyan-400 transition-colors">
            <FaUserFriends size={20} />
          </Link>
          <Link to="/notifications" className="hover:text-cyan-400 transition-colors">
            <FaBell size={20} />
          </Link>
          <Link to="/profile" className="hover:text-cyan-400 transition-colors">
            <FaUser size={20} />
          </Link>
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
