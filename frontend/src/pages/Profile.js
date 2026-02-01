import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || '');
  const [branch, setBranch] = useState(user?.branch || '');
  const [loading, setLoading] = useState(false);

  const branches = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Civil Engineering',
    'Mechanical Engineering',
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/profile`, {
        email,
        branch: user?.role === 'undergraduate' ? branch : null,
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-black text-white mb-12">My Profile</h1>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2">Student Type</label>
                <input
                  type="text"
                  value={user?.role === 'pre-university' ? 'Pre-University Student' : 'Undergraduate'}
                  disabled
                  className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
                />
              </div>

              {user?.role === 'undergraduate' && (
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Engineering Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-slate-700">Select Branch</option>
                    {branches.map((b) => (
                      <option key={b} value={b} className="bg-slate-700">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 mt-6"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-8 p-6 bg-slate-800 bg-opacity-30 rounded-xl border border-purple-500 border-opacity-20">
            <h3 className="text-white font-bold mb-2">Note</h3>
            <p className="text-gray-400 text-sm">
              Your profile information helps us personalize your learning experience and recommend the best roadmaps for your goals.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
