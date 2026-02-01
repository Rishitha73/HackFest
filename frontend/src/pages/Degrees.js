import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import { toast } from 'react-toastify';

const Degrees = () => {
  const { user } = useContext(AuthContext);
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDegrees = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/degrees');
      const data = await response.json();
      const allDegrees = data.data || [];
      
      // Filter degrees based on user role and limit to 10
      const userRole = user?.role || 'pre-university';
      const filteredDegrees = allDegrees
        .filter(degree => degree.targetRole === userRole)
        .slice(0, 10); // Show maximum 10 degrees
      
      setDegrees(filteredDegrees);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching degrees:', error);
      toast.error('Failed to load degrees');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDegrees();
  }, [user?.role]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Explore {user?.role === 'undergraduate' ? 'Professional' : 'Academic'} Degrees
            </h1>
            <p className="text-xl text-gray-400">
              {user?.role === 'undergraduate' 
                ? 'Choose from professional and technical degree programs designed for engineering, medicine, law, and specialized fields'
                : 'Choose from our curated selection of theoretical and general degree programs including science, arts, and commerce'}
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-pink-600 rounded-full"></div>
              </div>
            </div>
          ) : degrees.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No degrees available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {degrees.map((degree) => (
                <Link
                  key={degree._id || degree.id}
                  to={`/degree/${degree._id || degree.id}`}
                  className="group relative bg-gradient-to-br from-blue-600 to-cyan-600 p-0.5 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative bg-slate-900 rounded-2xl p-8 h-full">
                    <h3 className="text-2xl font-bold text-white mb-2">{degree.name}</h3>
                    <p className="text-gray-300 mb-4">{degree.description}</p>
                    <div className="flex items-center text-purple-400 group-hover:text-pink-400 transition-colors">
                      <span className="font-semibold">Explore</span>
                      <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Degrees;
