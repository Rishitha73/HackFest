import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/roadmaps`);
      setRoadmaps(response.data);
    } catch (error) {
      toast.error('Failed to load roadmaps');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roadmapId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/roadmaps/${roadmapId}`);
        toast.success('Roadmap deleted!');
        fetchRoadmaps();
      } catch (error) {
        toast.error('Failed to delete roadmap');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-purple-500 border-opacity-30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-300 mt-4">Loading your roadmaps...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-black text-white mb-12">My Saved Roadmaps</h1>

          {roadmaps.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20">
              <p className="text-gray-400 text-lg mb-6">No roadmaps saved yet. Start exploring to generate your first personalized roadmap!</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Explore Now →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((roadmap, index) => (
                <div 
                  key={roadmap._id} 
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-0.5 hover:border-opacity-50 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 h-full flex flex-col">
                    <h2 className="text-2xl font-bold text-white mb-3">{roadmap.title}</h2>
                    <p className="text-gray-400 mb-6 flex-1">
                      <span className="inline-block bg-purple-500 bg-opacity-20 rounded-full px-3 py-1 text-sm">
                        {roadmap.phases?.length || 0} phases
                      </span>
                      <span className="ml-3 text-sm text-gray-500">
                        Created {new Date(roadmap.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                    <div className="flex gap-3 pt-4 border-t border-purple-500 border-opacity-20">
                      <button
                        onClick={() => navigate(`/roadmap/${roadmap._id}`)}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(roadmap._id)}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Roadmaps;
