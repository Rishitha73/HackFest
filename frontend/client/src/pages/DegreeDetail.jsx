import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  TrendingUp,
  Target,
  ChevronRight,
  BarChart3,
  GraduationCap,
  MapPin,
  DollarSign,
  CheckCircle
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const DegreeDetail = () => {
  const { degreeId } = useParams();
  const navigate = useNavigate();
  const [degree, setDegree] = useState(null);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Degree Data Mapping
  const degreeData = {
    btech: {
      id: 'btech',
      name: 'Bachelor of Technology (B.Tech)',
      fullName: 'Bachelor of Technology',
      description: 'A 4-year professional undergraduate engineering degree focusing on the application of scientific and mathematical principles to design, develop, and maintain systems, structures, and processes.',
      duration: '4 years (8 semesters)',
      eligibility: '10+2 with Physics, Chemistry, Mathematics (PCM)',
      avgSalary: '₹6-15 LPA (Starting)',
      popularColleges: ['IITs', 'NITs', 'BITS Pilani', 'DTU', 'VIT'],
      overview: 'B.Tech is one of the most sought-after engineering degrees in India, offering practical, industry-oriented education with a strong focus on innovation and problem-solving.',
      icon: '⚙️',
      category: 'Engineering'
    },
    bsc: {
      id: 'bsc',
      name: 'Bachelor of Science (B.Sc)',
      fullName: 'Bachelor of Science',
      description: 'A 3-year undergraduate academic degree awarded for completed courses in sciences, providing foundational knowledge in scientific principles and research methodology.',
      duration: '3 years (6 semesters)',
      eligibility: '10+2 with Science stream (PCB/PCM)',
      avgSalary: '₹3-8 LPA (Starting)',
      popularColleges: ['University of Delhi', 'University of Mumbai', 'St. Xavier\'s', 'Christ University', 'Fergusson College'],
      overview: 'B.Sc provides a strong foundation in scientific principles, preparing students for research, higher studies, and various science-related careers.',
      icon: '🔬',
      category: 'Science'
    }
  };

  // Branches Data
  const branchesData = {
    btech: [
      {
        id: 'cse',
        name: 'Computer Science & Engineering',
        description: 'Focuses on computer systems, software development, algorithms, and computational theory.',
        duration: '4 years',
        difficulty: 'High',
        demand: 'Very High',
        avgSalary: '₹8-20 LPA',
        skills: ['Programming', 'Algorithms', 'Database', 'Networking'],
        icon: '💻'
      },
      {
        id: 'ece',
        name: 'Electronics & Communication Engineering',
        description: 'Deals with electronic devices, circuits, communication equipment, and systems.',
        duration: '4 years',
        difficulty: 'High',
        demand: 'High',
        avgSalary: '₹6-15 LPA',
        skills: ['Circuit Design', 'Signal Processing', 'VLSI', 'Embedded Systems'],
        icon: '📡'
      },
      {
        id: 'me',
        name: 'Mechanical Engineering',
        description: 'Focuses on mechanics, thermodynamics, manufacturing, and machine design.',
        duration: '4 years',
        difficulty: 'Medium',
        demand: 'High',
        avgSalary: '₹5-12 LPA',
        skills: ['CAD/CAM', 'Thermodynamics', 'Machine Design', 'Manufacturing'],
        icon: '⚙️'
      },
      {
        id: 'ce',
        name: 'Civil Engineering',
        description: 'Deals with design, construction, and maintenance of physical structures.',
        duration: '4 years',
        difficulty: 'Medium',
        demand: 'Medium',
        avgSalary: '₹4-10 LPA',
        skills: ['Structural Design', 'Surveying', 'Construction', 'Geotech'],
        icon: '🏗️'
      },
      {
        id: 'eee',
        name: 'Electrical & Electronics Engineering',
        description: 'Focuses on electrical systems, power generation, and electronic devices.',
        duration: '4 years',
        difficulty: 'High',
        demand: 'Medium',
        avgSalary: '₹5-12 LPA',
        skills: ['Power Systems', 'Control Systems', 'Electrical Machines', 'Power Electronics'],
        icon: '⚡'
      },
      {
        id: 'chemical',
        name: 'Chemical Engineering',
        description: 'Applies chemistry principles to industrial processes and product development.',
        duration: '4 years',
        difficulty: 'High',
        demand: 'Medium',
        avgSalary: '₹6-14 LPA',
        skills: ['Process Design', 'Thermodynamics', 'Reaction Engineering', 'Plant Design'],
        icon: '🧪'
      }
    ],
    bsc: [
      {
        id: 'physics',
        name: 'Physics',
        description: 'Study of matter, energy, and their interactions through space and time.',
        duration: '3 years',
        difficulty: 'High',
        demand: 'Medium',
        avgSalary: '₹4-9 LPA',
        skills: ['Mathematics', 'Computational Physics', 'Experimental Techniques', 'Theoretical Concepts'],
        icon: '🌌'
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        description: 'Study of substances, their properties, reactions, and composition.',
        duration: '3 years',
        difficulty: 'Medium',
        demand: 'Medium',
        avgSalary: '₹4-8 LPA',
        skills: ['Analytical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
        icon: '🧪'
      },
      {
        id: 'mathematics',
        name: 'Mathematics',
        description: 'Study of numbers, quantities, structures, space, and change.',
        duration: '3 years',
        difficulty: 'High',
        demand: 'High',
        avgSalary: '₹5-12 LPA',
        skills: ['Calculus', 'Algebra', 'Statistics', 'Number Theory'],
        icon: '📐'
      },
      {
        id: 'computerscience',
        name: 'Computer Science',
        description: 'Study of computers, computational systems, and algorithmic processes.',
        duration: '3 years',
        difficulty: 'Medium',
        demand: 'Very High',
        avgSalary: '₹6-15 LPA',
        skills: ['Programming', 'Data Structures', 'Database', 'Web Development'],
        icon: '💻'
      }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setDegree(degreeData[degreeId] || degreeData.btech);
      setBranches(branchesData[degreeId] || branchesData.btech);
      setLoading(false);
    }, 500);
  }, [degreeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary"></div>
      </div>
    );
  }

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Degree Not Found
            </h2>
            <Button onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="section-padding">
        <div className="container-custom max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Degrees
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{degree.icon}</div>
                  <div>
                    <h1 className="text-4xl font-bold text-text-primary mb-2">
                      {degree.name}
                    </h1>
                    <p className="text-text-secondary">
                      {degree.fullName} • {degree.category}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary mb-8">
                  {degree.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-text-secondary" />
                      <div>
                        <div className="text-sm text-text-secondary">Duration</div>
                        <div className="font-semibold text-text-primary">{degree.duration}</div>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-text-secondary" />
                      <div>
                        <div className="text-sm text-text-secondary">Avg. Salary</div>
                        <div className="font-semibold text-text-primary">{degree.avgSalary}</div>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-text-secondary" />
                      <div>
                        <div className="text-sm text-text-secondary">Demand</div>
                        <div className="font-semibold text-text-primary">High</div>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-text-secondary" />
                      <div>
                        <div className="text-sm text-text-secondary">Top Colleges</div>
                        <div className="font-semibold text-text-primary">IITs, NITs</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <Card>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Quick Facts
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Eligibility</div>
                      <div className="text-text-primary">{degree.eligibility}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Admission Process</div>
                      <div className="text-text-primary">Entrance Exams (JEE, State-level)</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Career Options</div>
                      <div className="text-text-primary">Industry, Research, Higher Studies, Entrepreneurship</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Further Studies</div>
                      <div className="text-text-primary">M.Tech, MBA, MS, PhD</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button className="w-full">
                      Download Brochure
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Overview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Degree Overview
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-text-secondary mb-4">
                  {degree.overview}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Why Choose {degree.name}?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">Industry-relevant curriculum with practical exposure</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">Strong placement opportunities with top companies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">Foundation for higher studies and research</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">Development of problem-solving and analytical skills</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Popular Career Paths
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-secondary-bg rounded-lg">
                        <span className="text-text-primary">Industry Professional</span>
                        <span className="text-text-secondary text-sm">₹8-20 LPA</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary-bg rounded-lg">
                        <span className="text-text-primary">Research Scientist</span>
                        <span className="text-text-secondary text-sm">₹6-15 LPA</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary-bg rounded-lg">
                        <span className="text-text-primary">Higher Studies</span>
                        <span className="text-text-secondary text-sm">M.Tech/MS/MBA</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-secondary-bg rounded-lg">
                        <span className="text-text-primary">Entrepreneurship</span>
                        <span className="text-text-secondary text-sm">Varies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Branches Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary">
                  Specializations ({branches.length})
                </h2>
                <p className="text-text-secondary mt-2">
                  Click on any specialization to explore in detail
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-text-secondary">
                <Target className="h-5 w-5" />
                <span>All branches are 4-year programs</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/branch/${degreeId}/${branch.id}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">{branch.icon}</div>
                        <ChevronRight className="h-5 w-5 text-text-secondary group-hover:translate-x-2 transition-transform mt-2" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-black transition-colors">
                        {branch.name}
                      </h3>
                      
                      <p className="text-text-secondary text-sm mb-6 line-clamp-3">
                        {branch.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Demand</span>
                          <span className={`font-medium px-2 py-1 rounded ${
                            branch.demand === 'Very High' ? 'bg-green-100 text-green-800' :
                            branch.demand === 'High' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {branch.demand}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Avg. Salary</span>
                          <span className="font-medium text-text-primary">{branch.avgSalary}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-text-secondary">Difficulty</span>
                          <span className={`font-medium px-2 py-1 rounded ${
                            branch.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                            branch.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {branch.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                          {branch.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-secondary-bg text-text-secondary text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-secondary-bg">
              <div className="text-center max-w-3xl mx-auto p-8">
                <GraduationCap className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Ready to Explore Specializations?
                </h3>
                <p className="text-text-secondary mb-6">
                  Click on any specialization above to get detailed information about 
                  curriculum, career opportunities, required skills, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/dashboard')} variant="secondary">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to All Degrees
                  </Button>
                  <Button>
                    Compare Specializations
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DegreeDetail;