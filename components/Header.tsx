
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-10">
      <div className="flex justify-center mb-6">
        <div className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[1px] rounded-full shadow-lg shadow-purple-500/10">
          <div className="bg-gray-900 rounded-full px-5 py-1.5">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              By Yahya Akram
            </span>
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
        Branding Budget <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-purple-500">Calculator</span>
      </h1>
      
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 font-medium leading-relaxed px-4">
        Accurate branding project estimates for Egypt & the MENA region, 
        powered by real-time market intelligence.
      </p>
    </header>
  );
};

export default Header;
