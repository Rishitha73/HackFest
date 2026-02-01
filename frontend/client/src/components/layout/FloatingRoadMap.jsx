// src/components/layout/FloatingRoadmapButton.jsx
import React, { useState } from 'react';
import { Map, X } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import toast from 'react-hot-toast';
import { generateRoadmap } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const FloatingRoadmapButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState('');
  const [focus, setFocus] = useState('');
  const { user } = useAuth();

  const handleGenerateRoadmap = async () => {
    if (!interests.trim()) {
      toast.error('Please enter your interests');
      return;
    }

    setLoading(true);
    try {
      const response = await generateRoadmap({
        userId: user._id,
        role: user.role,
        branch: user.branch,
        interests,
        focus,
      });

      toast.success('Roadmap generated successfully!');
      setIsOpen(false);
      setInterests('');
      setFocus('');
      
      // Redirect to roadmap view
      window.location.href = `/roadmaps/${response.data._id}`;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-text-secondary text-primary-bg shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 group"
        aria-label="Generate roadmap"
      >
        <Map className="h-6 w-6 mx-auto" />
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-text-secondary text-primary-bg text-sm px-3 py-1 rounded-lg whitespace-nowrap">
            Generate Roadmap
          </div>
        </div>
      </button>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Generate Career Roadmap"
        size="medium"
      >
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-text-primary mb-2">
              Tell us about your interests
            </h4>
            <p className="text-text-secondary text-sm">
              This will help us create a personalized roadmap for your career journey.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Your Interests & Passions *
              </label>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., I enjoy problem-solving, working with data, building applications..."
                className="w-full h-32 px-4 py-3 border border-border rounded-lg bg-secondary-bg text-text-primary placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Specific Focus Areas (Optional)
              </label>
              <input
                type="text"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="e.g., Artificial Intelligence, Web Development, Data Science"
                className="w-full px-4 py-3 border border-border rounded-lg bg-secondary-bg text-text-primary placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {user?.branch && (
              <div className="p-3 bg-secondary-bg rounded-lg">
                <p className="text-sm text-text-secondary">
                  Based on your profile: <span className="font-medium text-text-primary">{user.branch}</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateRoadmap}
              loading={loading}
              disabled={loading}
            >
              Generate Roadmap
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FloatingRoadmapButton;