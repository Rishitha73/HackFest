// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'pre-university',
    branch: '',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const branches = [
    'Computer Science & Engineering',
    'Electrical & Electronics Engineering',
    'Electronics & Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology',
    'Artificial Intelligence & Data Science',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.role === 'undergraduate' && !formData.branch) {
      toast.error('Please select your branch');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      toast.success('Account created — redirecting to Home');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <Navbar />
      
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="h-12 w-12 rounded-lg bg-secondary-bg flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-6 w-6 text-text-secondary" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              Join CareerGuide
            </h2>
            <p className="text-text-secondary">
              Create your account to start your informed journey
            </p>
          </div>

          <div className="bg-primary-bg border border-border rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-text-secondary mt-2">
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  I am a *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'pre-university'})}
                    className={`py-3 border rounded-lg transition-colors ${
                      formData.role === 'pre-university'
                        ? 'border-text-secondary bg-secondary-bg text-text-primary'
                        : 'border-border hover:bg-secondary-bg text-text-secondary'
                    }`}
                  >
                    Pre-University Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'undergraduate'})}
                    className={`py-3 border rounded-lg transition-colors ${
                      formData.role === 'undergraduate'
                        ? 'border-text-secondary bg-secondary-bg text-text-primary'
                        : 'border-border hover:bg-secondary-bg text-text-secondary'
                    }`}
                  >
                    Undergraduate Student
                  </button>
                </div>
              </div>

              {formData.role === 'undergraduate' && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Your Branch *
                  </label>
                  <div className="relative">
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    >
                      <option value="">Select your branch</option>
                      {branches.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 mt-1 border-border rounded bg-secondary-bg text-text-secondary focus:ring-accent"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link to="/terms" className="text-accent hover:text-black">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-accent hover:text-black">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
                className="w-full"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-accent hover:text-black font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;