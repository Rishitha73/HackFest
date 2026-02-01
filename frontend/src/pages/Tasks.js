import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { toast } from 'react-toastify';

const Tasks = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/courses');
      const data = await response.json();
      setCourses(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load tasks');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Animated background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              7 Days Tasks
            </h1>
            <p className="text-xl text-gray-400">Get hands-on with structured 7-day tasks before committing. Build real projects with confidence</p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-pink-600 rounded-full"></div>
              </div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No tasks available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Link
                  key={course._id || course.id}
                  to={`/course/${course._id || course.id}`}
                  className="group relative bg-gradient-to-br from-purple-600 to-pink-600 p-0.5 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative bg-slate-900 rounded-2xl p-8 h-full">
                    <h3 className="text-2xl font-bold text-white mb-2">{course.name}</h3>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <div className="mb-4">
                      <span className="inline-block bg-purple-500 bg-opacity-30 px-3 py-1 rounded-full text-sm text-purple-300 border border-purple-400 border-opacity-50">
                        {course.duration || '7 Days'}
                      </span>
                    </div>
                    <div className="flex items-center text-pink-400 group-hover:text-orange-400 transition-colors">
                      <span className="font-semibold">Start Task</span>
                      <span className="ml-2 group-hover:ml-3 transition-all">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
