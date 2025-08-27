import React from 'react';
import { Shield } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-800 dark:to-emerald-800 text-white py-12 px-4 relative">
      <div className="max-w-6xl mx-auto text-center">
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Shield size={32} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Encryption & Decryption Tool
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-6">
          Explore various encryption and decryption techniques
        </p>
        <div className="inline-flex items-center bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 rounded-full px-6 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium">From classical ciphers to modern encoding</span>
        </div>
      </div>
    </header>
  );
};

export default Header;