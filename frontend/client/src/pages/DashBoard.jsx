// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter,
  Grid,
  List,
  TrendingUp,
  Target,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import FloatingRoadmapButton from '../components/layout/FloatingRoadmapButton';
import DegreeCard from '../components/dashboard/DegreeCard';
import BranchCard from '../components/dashboard/BranchCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { getAllDegrees, getCoursesByBranch } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [degrees, setDegrees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      if (user?.role === 'pre-university') {
        const response = await getAllDegrees();
        setDegrees(response.data);
      } else if (user?.role === 'undergraduate' && user?.branch) {
        // In a real app, you would fetch courses based on the user's branch
        const mockCourses = getMockCourses(user.branch);
        setCourses(mockCourses);
      }
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMockCourses = (branch) => {
    const coursesMap = {
      'Computer Science & Engineering': [
        {
          id: 1,
          name: 'Artificial Intelligence',
          description: 'Study of intelligent agents and machine learning algorithms',
          difficulty: 'High',
          careerPaths: ['AI Engineer', 'ML Researcher', 'Data Scientist'],
          demand: 'Very High',
          avgSalary: '₹15-30 LPA',
          keySkills: ['Python', 'TensorFlow', 'ML Algorithms', 'NLP']
        },
        {
          id: 2,
          name: 'Web Development',
          description: 'Full-stack web application development',
          difficulty: 'Medium',
          careerPaths: ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer'],
          demand: 'High',
          avgSalary: '₹8-20 LPA',
          keySkills: ['React', 'Node.js', 'MongoDB', 'AWS']
        },
        {
          id: 3,
          name: 'Cybersecurity',
          description: 'Protection of computer systems and networks',
          difficulty: 'High',
          careerPaths: ['Security Analyst', 'Ethical Hacker', 'Security Architect'],
          demand: 'High',
          avgSalary: '₹12-25 LPA',
          keySkills: ['Network Security', 'Cryptography', 'Penetration Testing']
        }
      ],
      // Add other branches as needed
    };

    return coursesMap[branch] || [];
  };

  const getFilteredData = () => {
    let data = user?.role === 'pre-university' ? degrees : courses;
    
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter !== 'all') {
      data = data.filter(item => item.difficulty === activeFilter);
    }

    return data;
  };

  const getStats = () => {
    const data = user?.role === 'pre-university' ? degrees : courses;
    return {
      total: data.length,
      highDemand: data.filter(item => item.demand === 'High' || item.demand === 'Very High').length,
      avgSalary: data.reduce((acc, item) => {
        const salary = parseInt(item.avgSalary?.match(/\d+/)?.[0] || '0');
        return acc + salary;
      }, 0) / data.length || 0
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary"></div>
      </div>
    );
  }

  const stats = getStats();
  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-primary-bg">
      <Navbar />
      <FloatingRoadmapButton />

      <main className="section-padding">
        <div className="container-custom">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                  Welcome back, {user?.name || 'Student'}!
                </h1>
                <p className="text-text-secondary">
                  {user?.role === 'pre-university'
                    ? 'Explore degree options and plan your academic journey'
                    : `Specialize in ${user?.branch || 'your field'} and build your career path`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-text-secondary">Current Focus</div>
                  <div className="font-medium text-text-primary">
                    {user?.role === 'pre-university' ? 'Degree Exploration' : user?.branch}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-secondary-bg rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary-bg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{stats.total}</div>
                    <div className="text-sm text-text-secondary">
                      {user?.role === 'pre-university' ? 'Degrees' : 'Courses'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-bg rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary-bg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">{stats.highDemand}</div>
                    <div className="text-sm text-text-secondary">High Demand</div>
                  </div>
                </div>
              </div>
              <div className="bg-secondary-bg rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary-bg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-text-primary">
                      ₹{Math.round(stats.avgSalary)}L
                    </div>
                    <div className="text-sm text-text-secondary">Avg. Salary</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-secondary" />
                <Input
                  type="search"
                  placeholder={`Search ${user?.role === 'pre-university' ? 'degrees' : 'courses'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-text-secondary" />
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="border border-border rounded-lg px-3 py-2 bg-secondary-bg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="all">All Difficulty</option>
                    <option value="Low">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="High">Hard</option>
                  </select>
                </div>
                
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-secondary-bg' : 'hover:bg-secondary-bg'}`}
                  >
                    <Grid className="h-5 w-5 text-text-secondary" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-secondary-bg' : 'hover:bg-secondary-bg'}`}
                  >
                    <List className="h-5 w-5 text-text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {filteredData.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No {user?.role === 'pre-university' ? 'degrees' : 'courses'} found
              </h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {user?.role === 'pre-university' ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((degree, index) => (
                      <motion.div
                        key={degree.id || degree._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <DegreeCard degree={degree} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredData.map((degree, index) => (
                      <motion.div
                        key={degree.id || degree._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-primary-bg border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-text-primary">
                                {degree.name}
                              </h3>
                              <p className="text-text-secondary mt-1">{degree.description}</p>
                            </div>
                            <Button variant="secondary">
                              Explore
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredData.map((course, index) => (
                    <motion.div
                      key={course.id || course._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <BranchCard branch={course} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="bg-secondary-bg rounded-xl p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-primary-bg border border-border rounded-lg p-4 text-left hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center mb-3">
                    <Target className="h-5 w-5 text-text-secondary" />
                  </div>
                  <h4 className="font-medium text-text-primary">Take Assessment</h4>
                  <p className="text-sm text-text-secondary mt-1">
                    Discover your ideal career path
                  </p>
                </button>
                <button className="bg-primary-bg border border-border rounded-lg p-4 text-left hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center mb-3">
                    <TrendingUp className="h-5 w-5 text-text-secondary" />
                  </div>
                  <h4 className="font-medium text-text-primary">View Trends</h4>
                  <p className="text-sm text-text-secondary mt-1">
                    Latest industry insights
                  </p>
                </button>
                <button className="bg-primary-bg border border-border rounded-lg p-4 text-left hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-lg bg-secondary-bg flex items-center justify-center mb-3">
                    <BarChart3 className="h-5 w-5 text-text-secondary" />
                  </div>
                  <h4 className="font-medium text-text-primary">My Progress</h4>
                  <p className="text-sm text-text-secondary mt-1">
                    Track your learning journey
                  </p>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;