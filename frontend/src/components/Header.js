import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500 border-opacity-20 backdrop-blur-md shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300"
        >
          ClarityForge
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center">
          {!user && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/roadmaps"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                My Roadmaps
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="ml-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-slate-800 bg-opacity-50 backdrop-blur-md border-t border-purple-500 border-opacity-20 p-4 space-y-2">
          {!user && (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold"
              >
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/roadmaps"
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                My Roadmaps
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
