import React from 'react';
import { Outlet } from 'react-router';

const Layout2 = () => {
  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-zinc-800 rounded-2xl shadow-lg p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout2;
