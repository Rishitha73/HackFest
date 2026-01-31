// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  BarChart3, 
  Users, 
  TrendingUp,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import data from '../data/data.json';

const Home = () => {
  const problems = [
    'Choosing the wrong specialization leads to career dissatisfaction',
    'Lack of real-world insight into different career paths',
    'Skill mismatches between education and industry requirements',
    'Limited access to mentorship and guidance'
  ];

  const solutions = [
    'AI-powered career path recommendations',
    'Interactive roadmaps with milestone tracking',
    'Industry-aligned skill development guides',
    'Access to mentor networks and alumni insights'
  ];

  const features = [
    {
      icon: Target,
      title: 'Personalized Recommendations',
      description: 'AI-driven suggestions based on your interests, skills, and goals'
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Real-time labor market data and career trajectory analysis'
    },
    {
      icon: Users,
      title: 'Mentor Network',
      description: 'Connect with industry professionals and alumni for guidance'
    },
    {
      icon: TrendingUp,
      title: 'Skill Development',
      description: 'Structured learning paths with project-based milestones'
    }
  ];

  const { degrees = [] } = data;

  const undergradDegrees = degrees.filter(degree => degree.level === 'undergrad');
  const gradDegrees = degrees.filter(degree => degree.level === 'grad');

  return (
    <div className="min-h-screen bg-primary-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-bg rounded-full mb-6">
              <GraduationCap className="h-4 w-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">Future-Proof Your Career</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Empowering Informed Academic and Career Choices
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Students face uncertainty in choosing paths without data—leading to mismatches.
              We provide the clarity, insights, and guidance you need to make confident decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="large" className="group">
                  Get Started Free
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="secondary" size="large">
                  Explore Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-secondary-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Problem We Solve
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Every year, millions of students make critical decisions with incomplete information
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <ul className="space-y-4">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-text-secondary text-primary-bg flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-text-secondary">{problem}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-text-primary">
                    The Impact
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-text-secondary">Career Satisfaction</span>
                        <span className="text-sm font-medium text-text-primary">↓ 40%</span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-text-secondary w-2/5"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-text-secondary">Skill Relevance</span>
                        <span className="text-sm font-medium text-text-primary">↓ 35%</span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-text-secondary w-1/3"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-text-secondary">Time to Employment</span>
                        <span className="text-sm font-medium text-text-primary">↑ 60%</span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-text-secondary w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The Solution We Provide
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                A comprehensive platform that bridges the gap between education and career success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-text-primary">
                  Platform Features
                </h3>
                <ul className="space-y-4">
                  {solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent text-primary-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-text-secondary">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-text-primary">
                  User Roles
                </h3>
                <div className="space-y-4">
                  <Card>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary-bg flex items-center justify-center">
                        <Users className="h-6 w-6 text-text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">Pre-University Students</h4>
                        <p className="text-sm text-text-secondary mt-1">
                          Explore degree options and career paths
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary-bg flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">Undergraduate Students</h4>
                        <p className="text-sm text-text-secondary mt-1">
                          Specialize and plan your career journey
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose CareerGuide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <div className="h-12 w-12 rounded-lg bg-primary-bg border border-border flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Your Informed Journey Today
              </h2>
              <p className="text-text-secondary text-lg mb-8">
                Join thousands of students who have found clarity and direction in their academic and career paths
              </p>
              <Link to="/register">
                <Button size="large" className="px-8">
                  Create Free Account
                </Button>
              </Link>
              <p className="text-text-secondary text-sm mt-4">
                No credit card required • 7-day free trial
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Degrees Section */}
      <section className="section-padding bg-primary-bg">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Our Degrees
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Choose from a wide range of degrees and find the right path for your future
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {undergradDegrees.map(deg => (
                <Card key={deg.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {deg.name}
                    </h3>
                    <p className="text-text-secondary mb-4">
                      {deg.summary}
                    </p>
                    <Link to={`/degree/${deg.id}`}>
                      <Button variant="outline" className="w-full">
                        View branches
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Graduate Degrees
              </h2>
              <p style={{color: '#444'}} className="text-center mb-4">
                Explore degree paths and branches. Select a degree to view branches, then click a branch for detailed guidance.
              </p>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {gradDegrees.map(deg => (
                  <div key={deg.id} className="min-w-[260px]">
                    <Card className="h-full">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">
                          {deg.name}
                        </h3>
                        <p className="text-text-secondary mb-4">
                          {deg.summary}
                        </p>
                        <Link to={`/degree/${deg.id}`}>
                          <Button variant="outline" className="w-full">
                            View branches
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;