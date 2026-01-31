// src/pages/SavedRoadmaps.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Map, 
  Trash2, 
  Eye, 
  Calendar,
  Target,
  TrendingUp,
  Filter,
  Search,
  Plus,
  FileText
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingRoadmapButton from '../components/layout/FloatingRoadmapButton';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import { getSavedRoadmaps, deleteRoadmap } from '../services/api';
import toast from 'react-hot-toast';

const SavedRoadmaps = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);
      const response = await getSavedRoadmaps();
      setRoadmaps(response.data);
    } catch (error) {
      toast.error('Failed to fetch roadmaps');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRoadmap(id);
      setRoadmaps(roadmaps.filter(roadmap => roadmap._id !== id));
      toast.success('Roadmap deleted successfully');
      setDeleteModal(null);
    } catch (error) {
      toast.error('Failed to delete roadmap');
    }
  };

  const filteredRoadmaps = roadmaps.filter(roadmap => {
    const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || roadmap.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-secondary-bg text-text-secondary';
    }
  };

  if (loading) {
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
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  My Roadmaps
                </h1>
                <p className="text-text-secondary">
                  Track and manage your personalized career learning paths
                </p>
              </div>
              <Button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Generate New
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center">
                    <Map className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{roadmaps.length}</div>
                    <div className="text-sm text-text-secondary">Total Roadmaps</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center">
                    <Target className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      {roadmaps.filter(r => r.status === 'active').length}
                    </div>
                    <div className="text-sm text-text-secondary">Active</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      {roadmaps.filter(r => r.status === 'completed').length}
                    </div>
                    <div className="text-sm text-text-secondary">Completed</div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      {Math.round(roadmaps.reduce((acc, r) => acc + (r.progress || 0), 0) / roadmaps.length)}%
                    </div>
                    <div className="text-sm text-text-secondary">Avg. Progress</div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <input
                  type="search"
                  placeholder="Search roadmaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-secondary-bg text-text-primary placeholder:text-disabled focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-text-secondary" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-border rounded-lg px-3 py-2 bg-secondary-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Roadmaps List */}
          {filteredRoadmaps.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <Map className="h-16 w-16 text-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No roadmaps found
                </h3>
                <p className="text-text-secondary mb-6">
                  {roadmaps.length === 0 
                    ? "You haven't created any roadmaps yet. Generate your first personalized roadmap to get started."
                    : "No roadmaps match your search criteria."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => navigate('/dashboard')}>
                    Generate Roadmap
                  </Button>
                  {roadmaps.length > 0 && (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSearchQuery('');
                        setFilter('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoadmaps.map((roadmap, index) => (
                <motion.div
                  key={roadmap._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-text-primary mb-1">
                            {roadmap.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(roadmap.status)}`}>
                            {roadmap.status}
                          </span>
                        </div>
                        <button
                          onClick={() => setDeleteModal(roadmap)}
                          className="p-1 hover:bg-secondary-bg rounded transition-colors"
                        >
                          <Trash2 className="h-5 w-5 text-text-secondary hover:text-red-600" />
                        </button>
                      </div>
                      
                      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {roadmap.description}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="flex justify-between text-sm text-text-secondary mb-1">
                            <span>Progress</span>
                            <span>{roadmap.progress || 0}%</span>
                          </div>
                          <div className="h-2 bg-border rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-text-secondary rounded-full"
                              style={{ width: `${roadmap.progress || 0}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-text-secondary">
                            <Calendar className="h-4 w-4" />
                            <span>Created: {new Date(roadmap.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="text-text-secondary">
                            {roadmap.phases?.length || 4} phases
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-text-primary mb-2">Focus Areas</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {roadmap.tags?.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-secondary-bg text-text-secondary text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {roadmap.tags?.length > 3 && (
                            <span className="text-text-secondary text-xs">
                              +{roadmap.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex gap-3">
                        <Link
                          to={`/roadmaps/${roadmap._id}`}
                          className="flex-1"
                        >
                          <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                        <Button className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Roadmap"
        size="small"
      >
        <div className="space-y-6">
          <div>
            <p className="text-text-secondary">
              Are you sure you want to delete "<span className="font-medium text-text-primary">{deleteModal?.title}</span>"?
            </p>
            <p className="text-text-secondary text-sm mt-2">
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(deleteModal._id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Roadmap
            </Button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default SavedRoadmaps;