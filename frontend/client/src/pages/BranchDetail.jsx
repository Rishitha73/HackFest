import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  BookOpen,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  ChevronRight,
  Map,
  Briefcase,
  GraduationCap,
  Cpu,
  Database,
  Code,
  Network,
  Shield,
  Cloud,
  Brain,
  Rocket,
  Zap,
  Layers,
  Smartphone,
  Globe
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const BranchDetail = () => {
  const { degreeId, branchId } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(null);
  const [relatedDomains, setRelatedDomains] = useState([]);
  const [loading, setLoading] = useState(true);

  // Complete Branch Data
  const branchData = {
    // B.Tech Branches
    cse: {
      id: 'cse',
      name: 'Computer Science & Engineering',
      degree: 'B.Tech',
      fullName: 'Bachelor of Technology in Computer Science & Engineering',
      overview: 'Computer Science & Engineering (CSE) is an academic program that integrates the fields of computer engineering and computer science. It focuses on the design, development, and application of computer systems and software.',
      description: 'CSE is one of the most popular engineering branches that deals with the design, implementation, and management of information systems. It combines principles from mathematics, engineering, and computing to develop software and hardware solutions.',
      
      curriculum: [
        'Data Structures and Algorithms',
        'Computer Networks',
        'Database Management Systems',
        'Operating Systems',
        'Software Engineering',
        'Object-Oriented Programming',
        'Computer Architecture',
        'Web Technologies',
        'Artificial Intelligence',
        'Machine Learning'
      ],
      
      careerPaths: [
        { role: 'Software Developer', salary: '₹8-20 LPA', demand: 'Very High' },
        { role: 'Data Scientist', salary: '₹10-25 LPA', demand: 'Very High' },
        { role: 'DevOps Engineer', salary: '₹9-22 LPA', demand: 'High' },
        { role: 'Cloud Architect', salary: '₹12-30 LPA', demand: 'High' },
        { role: 'Cybersecurity Analyst', salary: '₹8-18 LPA', demand: 'High' },
        { role: 'AI/ML Engineer', salary: '₹12-30 LPA', demand: 'Very High' }
      ],
      
      skillsRequired: [
        'Programming (Python, Java, C++)',
        'Problem Solving',
        'Data Structures & Algorithms',
        'Database Management',
        'System Design',
        'Version Control (Git)',
        'Cloud Computing',
        'Soft Skills & Communication'
      ],
      
      eligibility: '10+2 with Physics, Chemistry, Mathematics (PCM) with minimum 75% aggregate',
      entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE'],
      topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'NIT Trichy', 'IIIT Hyderabad'],
      duration: '4 years (8 semesters)',
      avgSalary: '₹8-20 LPA (Starting)',
      growth: '15-20% annually',
      demand: 'Very High',
      icon: '💻',
      
      futureScope: [
        'Artificial Intelligence and Machine Learning',
        'Quantum Computing',
        'Blockchain Technology',
        'Internet of Things (IoT)',
        'Cybersecurity',
        'Cloud Computing',
        'Extended Reality (XR)'
      ]
    },
    
    ece: {
      id: 'ece',
      name: 'Electronics & Communication Engineering',
      degree: 'B.Tech',
      fullName: 'Bachelor of Technology in Electronics & Communication Engineering',
      overview: 'ECE combines principles from electrical engineering and computer science to design electronic devices, communication systems, and integrated circuits.',
      description: 'ECE focuses on electronic devices, circuits, communication equipment like transmitters, receivers, and integrated circuits. It plays a crucial role in telecommunications, healthcare, defense, and consumer electronics.',
      
      curriculum: [
        'Digital Electronics',
        'Analog Circuits',
        'Communication Systems',
        'Signal Processing',
        'VLSI Design',
        'Embedded Systems',
        'Microprocessors',
        'Control Systems',
        'Antenna Theory',
        'Optical Communication'
      ],
      
      careerPaths: [
        { role: 'Electronics Design Engineer', salary: '₹6-15 LPA', demand: 'High' },
        { role: 'Communication Engineer', salary: '₹5-12 LPA', demand: 'Medium' },
        { role: 'VLSI Design Engineer', salary: '₹8-18 LPA', demand: 'High' },
        { role: 'Embedded Systems Engineer', salary: '₹7-16 LPA', demand: 'High' },
        { role: 'RF Engineer', salary: '₹6-14 LPA', demand: 'Medium' },
        { role: 'Telecom Engineer', salary: '₹5-12 LPA', demand: 'Medium' }
      ],
      
      skillsRequired: [
        'Circuit Design',
        'Signal Processing',
        'Embedded Systems Programming',
        'VLSI Design Tools',
        'Communication Protocols',
        'Problem Solving',
        'Mathematics & Physics'
      ],
      
      eligibility: '10+2 with Physics, Chemistry, Mathematics (PCM)',
      entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
      topColleges: ['IIT Bombay', 'IIT Delhi', 'IIT Kharagpur', 'NIT Warangal', 'DTU'],
      duration: '4 years',
      avgSalary: '₹6-15 LPA',
      growth: '10-15% annually',
      demand: 'High',
      icon: '📡',
      
      futureScope: [
        '5G/6G Technology',
        'IoT Devices',
        'Semiconductor Industry',
        'Robotics & Automation',
        'Medical Electronics',
        'Satellite Communication'
      ]
    }
  };

  // Related Domains Data
  const domainsData = {
    cse: [
      {
        id: 'ai-ml',
        name: 'Artificial Intelligence & Machine Learning',
        description: 'Building intelligent systems that can learn, reason, and solve complex problems.',
        icon: <Brain className="h-6 w-6" />,
        careerOptions: ['AI Engineer', 'ML Researcher', 'Data Scientist', 'NLP Engineer'],
        skills: ['Python', 'TensorFlow', 'Deep Learning', 'Statistics']
      },
      {
        id: 'web-dev',
        name: 'Web Development',
        description: 'Creating interactive websites and web applications for various platforms.',
        icon: <Globe className="h-6 w-6" />,
        careerOptions: ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer'],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
      },
      {
        id: 'cybersecurity',
        name: 'Cybersecurity',
        description: 'Protecting systems, networks, and data from digital attacks.',
        icon: <Shield className="h-6 w-6" />,
        careerOptions: ['Security Analyst', 'Ethical Hacker', 'Security Architect'],
        skills: ['Network Security', 'Cryptography', 'Penetration Testing']
      },
      {
        id: 'cloud-computing',
        name: 'Cloud Computing',
        description: 'Delivering computing services over the internet (servers, storage, databases).',
        icon: <Cloud className="h-6 w-6" />,
        careerOptions: ['Cloud Architect', 'DevOps Engineer', 'Cloud Consultant'],
        skills: ['AWS/Azure/GCP', 'Docker', 'Kubernetes', 'CI/CD']
      },
      {
        id: 'data-science',
        name: 'Data Science',
        description: 'Extracting insights and knowledge from structured and unstructured data.',
        icon: <Database className="h-6 w-6" />,
        careerOptions: ['Data Scientist', 'Data Analyst', 'Business Intelligence'],
        skills: ['Python/R', 'SQL', 'Statistics', 'Data Visualization']
      },
      {
        id: 'mobile-dev',
        name: 'Mobile Development',
        description: 'Creating applications for mobile devices like smartphones and tablets.',
        icon: <Smartphone className="h-6 w-6" />,
        careerOptions: ['iOS Developer', 'Android Developer', 'Cross-platform Developer'],
        skills: ['Swift/Kotlin', 'React Native', 'Flutter', 'Mobile UI/UX']
      }
    ],
    
    ece: [
      {
        id: 'vlsi',
        name: 'VLSI Design',
        description: 'Designing integrated circuits by combining millions of transistors.',
        icon: <Cpu className="h-6 w-6" />,
        careerOptions: ['VLSI Design Engineer', 'Verification Engineer', 'Physical Design Engineer'],
        skills: ['Verilog/VHDL', 'Cadence Tools', 'ASIC Design']
      },
      {
        id: 'embedded',
        name: 'Embedded Systems',
        description: 'Designing computer systems with dedicated functions within larger systems.',
        icon: <Layers className="h-6 w-6" />,
        careerOptions: ['Embedded Software Engineer', 'Firmware Engineer', 'IoT Developer'],
        skills: ['C/C++', 'RTOS', 'Microcontrollers', 'Communication Protocols']
      },
      {
        id: 'telecom',
        name: 'Telecommunications',
        description: 'Transmitting information over distances through electronic means.',
        icon: <Network className="h-6 w-6" />,
        careerOptions: ['Telecom Engineer', 'Network Engineer', 'RF Engineer'],
        skills: ['5G/6G', 'Wireless Communication', 'Network Protocols']
      },
      {
        id: 'robotics',
        name: 'Robotics & Automation',
        description: 'Designing and operating robots and automated systems.',
        icon: <Rocket className="h-6 w-6" />,
        careerOptions: ['Robotics Engineer', 'Automation Engineer', 'Control Systems Engineer'],
        skills: ['Control Theory', 'ROS', 'Machine Vision', 'Mechatronics']
      }
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setBranch(branchData[branchId] || branchData.cse);
      setRelatedDomains(domainsData[branchId] || domainsData.cse);
      setLoading(false);
    }, 500);
  }, [branchId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-secondary"></div>
      </div>
    );
  }

  if (!branch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <div className="text-center p-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Branch Not Found
            </h2>
            <Button onClick={() => navigate(-1)}>
              Go Back
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
          {/* Navigation */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
              <button onClick={() => navigate('/dashboard')} className="hover:text-text-primary">
                Degrees
              </button>
              <ChevronRight className="h-4 w-4" />
              <button onClick={() => navigate(`/degree/${degreeId}`)} className="hover:text-text-primary">
                {branch.degree}
              </button>
              <ChevronRight className="h-4 w-4" />
              <span className="text-text-primary font-medium">{branch.name}</span>
            </div>
            
            <button
              onClick={() => navigate(`/degree/${degreeId}`)}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to {branch.degree} Specializations
            </button>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{branch.icon}</div>
                  <div>
                    <h1 className="text-4xl font-bold text-text-primary mb-2">
                      {branch.name}
                    </h1>
                    <p className="text-text-secondary text-lg">
                      {branch.fullName}
                    </p>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary mb-8">
                  {branch.overview}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary mb-1">{branch.duration}</div>
                      <div className="text-sm text-text-secondary">Duration</div>
                    </div>
                  </Card>
                  <Card>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary mb-1">{branch.avgSalary}</div>
                      <div className="text-sm text-text-secondary">Avg. Salary</div>
                    </div>
                  </Card>
                  <Card>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary mb-1">{branch.demand}</div>
                      <div className="text-sm text-text-secondary">Demand</div>
                    </div>
                  </Card>
                  <Card>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-text-primary mb-1">{branch.growth}</div>
                      <div className="text-sm text-text-secondary">Growth Rate</div>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="lg:w-1/3">
                <Card>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Quick Stats
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Eligibility</span>
                      </div>
                      <span className="text-text-primary text-sm text-right">{branch.eligibility}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Entrance Exams</span>
                      </div>
                      <span className="text-text-primary text-sm">{branch.entranceExams.length}+</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Career Options</span>
                      </div>
                      <span className="text-text-primary text-sm">50+</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-text-secondary" />
                        <span className="text-text-secondary">Top Colleges</span>
                      </div>
                      <span className="text-text-primary text-sm">100+</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button className="w-full mb-3">
                      Download Syllabus
                    </Button>
                    <Button variant="secondary" className="w-full">
                      Compare with Other Branches
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Detailed Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Detailed Overview
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-text-secondary mb-6">
                  {branch.description}
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Key Curriculum Areas
                    </h3>
                    <ul className="space-y-3">
                      {branch.curriculum.map((subject, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-text-secondary">{subject}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Essential Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {branch.skillsRequired.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-secondary-bg text-text-primary rounded-lg text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Career Paths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-text-primary">
                  Career Opportunities
                </h2>
                <span className="text-text-secondary">
                  {branch.careerPaths.length} roles
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-left text-sm font-medium text-text-primary">Role</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-text-primary">Avg. Salary</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-text-primary">Demand</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-text-primary">Experience Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branch.careerPaths.map((path, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-border ${index % 2 === 0 ? 'bg-secondary-bg/30' : ''}`}
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-text-primary">{path.role}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-text-primary">{path.salary}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-16 rounded-full ${
                              path.demand === 'Very High' ? 'bg-green-500' : 
                              path.demand === 'High' ? 'bg-blue-500' : 'bg-yellow-500'
                            }`} />
                            <span className="text-text-secondary text-sm">{path.demand}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-text-secondary text-sm">0-2 years</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Related Domains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text-primary">
                  Related Domains & Specializations
                </h2>
                <p className="text-text-secondary mt-2">
                  Explore specific areas within {branch.name} for deeper specialization
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-text-secondary">
                <Map className="h-5 w-5" />
                <span>{relatedDomains.length} domains</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDomains.map((domain, index) => (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary-bg flex items-center justify-center">
                        {domain.icon}
                      </div>
                      <ChevronRight className="h-5 w-5 text-text-secondary group-hover:translate-x-2 transition-transform" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-black transition-colors">
                      {domain.name}
                    </h3>
                    
                    <p className="text-text-secondary text-sm mb-6 line-clamp-3">
                      {domain.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-text-primary mb-2">
                        Career Options
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {domain.careerOptions.slice(0, 2).map((option, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-secondary-bg text-text-secondary text-xs rounded-full"
                          >
                            {option}
                          </span>
                        ))}
                        {domain.careerOptions.length > 2 && (
                          <span className="px-3 py-1 text-text-secondary text-xs">
                            +{domain.careerOptions.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {domain.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-bg border border-border text-text-secondary text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Scope */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Future Scope & Emerging Trends
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branch.futureScope.map((trend, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-secondary-bg transition-colors"
                  >
                    <Zap className="h-5 w-5 text-text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-text-primary mb-1">{trend}</div>
                      <div className="text-text-secondary text-sm">
                        High growth potential in next 5-10 years
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => navigate(`/degree/${degreeId}`)}
              variant="secondary"
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Specializations
            </Button>
            <Button className="flex-1">
              Generate Career Roadmap
            </Button>
            <Button variant="secondary" className="flex-1">
              Compare with Other Branches
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BranchDetail;