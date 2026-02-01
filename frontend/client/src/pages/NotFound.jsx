// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-primary-bg">
      <Navbar />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="h-24 w-24 rounded-full bg-secondary-bg flex items-center justify-center mx-auto mb-6">
            <Compass className="h-12 w-12 text-text-secondary" />
          </div>
          
          <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
          
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="flex items-center gap-2 group">
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button variant="secondary">
                Go to Homepage
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-text-secondary text-sm">
              Need help?{' '}
              <Link to="/contact" className="text-accent hover:text-black">
                Contact support
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;