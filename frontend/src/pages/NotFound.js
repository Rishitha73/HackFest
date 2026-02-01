import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex justify-center items-center px-4">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              404
            </h1>
          </div>
          <p className="text-4xl font-bold text-white mb-4">Page Not Found</p>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            Oops! The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            ← Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
