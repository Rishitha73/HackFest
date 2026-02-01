import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Header from '../components/Header';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('pre-university');
  const [branch, setBranch] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const branches = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === 'undergraduate' && !branch) {
      toast.error('Please select a branch');
      return;
    }
    setLoading(true);
    try {
      await register(email, password, role, branch);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex justify-center items-center px-4 py-20">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-30 shadow-2xl overflow-hidden">
            {/* Header gradient bar */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  Join Us
                </h1>
                <p className="text-gray-400">Start your academic journey with ClarityForge</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Student Type</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="pre-university" className="bg-slate-700">Pre-University Student</option>
                    <option value="undergraduate" className="bg-slate-700">Undergraduate Student</option>
                  </select>
                </div>

                {role === 'undergraduate' && (
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Engineering Branch</label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="" className="bg-slate-700">Select Your Branch</option>
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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-purple-500 border-opacity-20">
                <p className="text-center text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition-colors duration-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Info section */}
          <div className="mt-8 p-6 bg-slate-800 bg-opacity-30 rounded-xl border border-purple-500 border-opacity-20">
            <p className="text-gray-400 text-sm text-center">
              <span className="font-semibold text-purple-300">Free forever.</span> No credit card required. Start exploring your path today.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
