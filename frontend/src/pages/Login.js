import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Header from '../components/Header';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-30 shadow-2xl overflow-hidden">
            {/* Header gradient bar */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-400">Sign in to continue your journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 mt-6"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-purple-500 border-opacity-20">
                <p className="text-center text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300 transition-colors duration-300">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Safe and secure login powered by JWT</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
