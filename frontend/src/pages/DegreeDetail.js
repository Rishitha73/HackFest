import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { toast } from 'react-toastify';

const DegreeDetail = () => {
  const { degreeId } = useParams();
  const [degree, setDegree] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDegreeAndBranches();
  }, [degreeId]);

  const fetchDegreeAndBranches = async () => {
    try {
      // Fetch degree info
      const degreeResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/degrees`
      );
      const allDegrees = degreeResponse.data.data || degreeResponse.data;
      const currentDegree = allDegrees.find(d => d._id === degreeId);
      setDegree(currentDegree);

      // Fetch branches
      const branchResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/degrees/${degreeId}/branches`
      );
      const branchData = Array.isArray(branchResponse.data) ? branchResponse.data : (branchResponse.data.data || []);
      setBranches(branchData);
    } catch (error) {
      console.error('Error loading degree:', error);
      toast.error('Failed to load degree information');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-purple-500 border-opacity-30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-300 mt-4">Loading branches...</p>
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
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="mb-8 inline-flex items-center px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg border border-purple-500 border-opacity-30 text-purple-300 hover:text-purple-200 transition-all duration-300"
          >
            <span className="mr-2">←</span> Back to Degrees
          </button>

          <h1 className="text-5xl font-black text-white mb-4">
            {degree?.name || 'Degree'}
          </h1>
          <p className="text-xl text-gray-400 mb-12">{degree?.description}</p>

          <h2 className="text-3xl font-bold text-white mb-8">
            Available Branches
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branches.map((branch, index) => (
              <div
                key={branch._id}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-0.5 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-opacity-50"
                onClick={() => navigate(`/branch/${branch._id}`)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white flex-1">{branch.name}</h2>
                  </div>
                  <p className="text-gray-400 mb-6 flex-1">{branch.overview}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-purple-500 border-opacity-20">
                    <span className="text-sm text-purple-300 font-semibold">
                      Explore specialization
                    </span>
                    <span className="text-gray-400 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {branches.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No branches available</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DegreeDetail;
