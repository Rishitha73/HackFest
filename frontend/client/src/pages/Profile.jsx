// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar,
  Map,
  BookOpen,
  Edit2,
  Save,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingRoadmapButton from '../components/layout/FloatingRoadmapButton';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { updateProfile } from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await updateProfile(formData);
      updateUser(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: Map, label: 'Roadmaps', value: user?.roadmapCount || 0 },
    { icon: BookOpen, label: 'Saved Items', value: user?.savedCount || 0 },
    { icon: Calendar, label: 'Days Active', value: user?.daysActive || 1 },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      <Navbar />
      <FloatingRoadmapButton />

      <main className="section-padding">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  My Profile
                </h1>
                <p className="text-text-secondary">
                  Manage your account settings and preferences
                </p>
              </div>
              <Button
                variant={isEditing ? "secondary" : "primary"}
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <X className="h-5 w-5" />
                    Cancel Edit
                  </>
                ) : (
                  <>
                    <Edit2 className="h-5 w-5" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-text-secondary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
                      <div className="text-sm text-text-secondary">{stat.label}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2">
              <Card>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-secondary-bg flex items-center justify-center">
                    <User className="h-10 w-10 text-text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary">
                      {user.name || 'User'}
                    </h2>
                    <p className="text-text-secondary">{user.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Shield className="h-4 w-4 text-text-secondary" />
                      <span className="text-sm text-text-secondary">
                        {user.role === 'pre-university' ? 'Pre-University Student' : 'Undergraduate Student'}
                      </span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Full Name
                      </label>
                      {isEditing ? (
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                        />
                      ) : (
                        <div className="p-3 border border-border rounded-lg bg-secondary-bg text-text-primary">
                          {user.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Email Address
                      </label>
                      <div className="p-3 border border-border rounded-lg bg-secondary-bg text-text-primary">
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 9876543210"
                        />
                      ) : (
                        <div className="p-3 border border-border rounded-lg bg-secondary-bg text-text-primary">
                          {user.phone || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Location
                      </label>
                      {isEditing ? (
                        <Input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="City, Country"
                        />
                      ) : (
                        <div className="p-3 border border-border rounded-lg bg-secondary-bg text-text-primary">
                          {user.location || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself, your interests, and career goals..."
                        className="w-full h-32 px-4 py-3 border border-border rounded-lg bg-secondary-bg text-text-primary placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                      />
                    ) : (
                      <div className="p-3 border border-border rounded-lg bg-secondary-bg text-text-primary min-h-[100px]">
                        {user.bio || 'No bio provided'}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-6 border-t border-border">
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                        className="flex items-center gap-2"
                      >
                        <Save className="h-5 w-5" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </Card>
            </div>

            {/* Right Column - Account Details */}
            <div>
              <Card>
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  Account Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="h-5 w-5 text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">User Role</span>
                    </div>
                    <div className="text-text-secondary">
                      {user.role === 'pre-university' ? 'Pre-University Student' : 'Undergraduate Student'}
                    </div>
                  </div>

                  {user.role === 'undergraduate' && user.branch && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-5 w-5 text-text-secondary" />
                        <span className="text-sm font-medium text-text-primary">Branch</span>
                      </div>
                      <div className="text-text-secondary">{user.branch}</div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">Member Since</span>
                    </div>
                    <div className="text-text-secondary">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="h-5 w-5 text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">Account Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-text-secondary">Active</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-text-primary mb-4">
                    Quick Actions
                  </h4>
                  <div className="space-y-3">
                    <Button
                      variant="secondary"
                      className="w-full justify-start"
                      onClick={() => navigate('/roadmaps')}
                    >
                      View My Roadmaps
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-start"
                      onClick={() => navigate('/dashboard')}
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                          toast.success('Account deletion requested');
                        }
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;