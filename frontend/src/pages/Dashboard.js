import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import RoadmapGenerator from '../components/RoadmapGenerator';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [degrees, setDegrees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (user?.role === 'pre-university') {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/degrees`
        );
        setDegrees(response.data.data || response.data);
      } else {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses?branch=${user?.branch}`
        );
        console.log('Courses response:', response.data);
        console.log('User branch:', user?.branch);
        const coursesData = response.data.data || response.data;
        console.log('Courses data:', coursesData);
        setCourses(coursesData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-purple-500 border-opacity-30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-300 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleGenerateRoadmap = (data) => {
    // Navigate to the roadmap generation page with the data
    navigate('/generate-roadmap', { state: { generationData: data } });
  };

  return (
    <>
      <Header />
      <RoadmapGenerator
        onGenerate={handleGenerateRoadmap}
        loading={false}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-block px-4 py-2 bg-purple-500 bg-opacity-20 rounded-full border border-purple-400 border-opacity-50 mb-4">
              <span className="text-purple-300 text-sm font-semibold">Welcome back!</span>
            </div>
            <h1 className="text-5xl font-black text-white mb-2">
              {user?.role === 'pre-university' ? 'Explore Degrees' : 'Your Courses'}
            </h1>
            <p className="text-gray-400 text-lg">
              {user?.role === 'pre-university'
                ? 'Discover degree programs and find your perfect fit'
                : `Explore courses in ${user?.branch}`}
            </p>
          </div>

          {user?.role === 'pre-university' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {degrees.map((degree, index) => (
                <div
                  key={degree._id}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 overflow-hidden transition-all duration-300 hover:border-opacity-50 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/degree/${degree._id}`)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Top gradient bar */}
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                  
                  <div className="p-6">
                    {/* Degree Number Badge */}
                    <div className="inline-block px-3 py-1 bg-purple-500 bg-opacity-20 rounded-full border border-purple-400 border-opacity-50 mb-3">
                      <span className="text-purple-300 text-xs font-semibold uppercase tracking-wide">Degree {index + 1}</span>
                    </div>

                    {/* Degree Title */}
                    <h2 className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                      {degree.name}
                    </h2>

                    {/* Short Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {degree.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-purple-500 border-opacity-20">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                        </svg>
                        <span className="text-purple-300 text-xs font-semibold">
                          {degree.branches?.length || 0} Branches
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-blue-300 text-xs font-semibold">
                          3-4 Years
                        </span>
                      </div>
                    </div>

                    {/* Preview Branches */}
                    {degree.branches && degree.branches.length > 0 && (
                      <div className="mb-4">
                        <p className="text-purple-300 text-xs font-semibold mb-2 uppercase tracking-wide">Available Specializations:</p>
                        <ul className="space-y-1">
                          {degree.branches.slice(0, 3).map((branch, idx) => (
                            <li key={idx} className="flex items-start text-gray-300 text-xs">
                              <span className="text-purple-400 mr-2 mt-0.5">•</span>
                              <span className="line-clamp-1">{branch.name}</span>
                            </li>
                          ))}
                        </ul>
                        {degree.branches.length > 3 && (
                          <p className="text-gray-500 text-xs mt-2">+{degree.branches.length - 3} more specializations</p>
                        )}
                      </div>
                    )}

                    {/* Explore Button */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                      Explore Branches
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <div
                    key={course._id}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 overflow-hidden transition-all duration-300 hover:border-opacity-50 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/course/${course._id}`)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Top gradient bar */}
                    <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
                    
                    <div className="p-6">
                      {/* Course Number Badge */}
                      <div className="inline-block px-3 py-1 bg-purple-500 bg-opacity-20 rounded-full border border-purple-400 border-opacity-50 mb-3">
                        <span className="text-purple-300 text-xs font-semibold uppercase tracking-wide">Course {index + 1}</span>
                      </div>

                      {/* Course Title */}
                      <h2 className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors">
                        {course.name}
                      </h2>

                      {/* Short Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {course.overview}
                      </p>

                      {/* Quick Stats */}
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-purple-500 border-opacity-20">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                          </svg>
                          <span className="text-purple-300 text-xs font-semibold">
                            {course.advancedTopics?.length || 0} Topics
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-blue-300 text-xs font-semibold">
                            {course.projects?.length || 0} Projects
                          </span>
                        </div>
                      </div>

                      {/* Preview Topics */}
                      {course.advancedTopics && course.advancedTopics.length > 0 && (
                        <div className="mb-4">
                          <p className="text-purple-300 text-xs font-semibold mb-2 uppercase tracking-wide">Key Topics:</p>
                          <ul className="space-y-1">
                            {course.advancedTopics.slice(0, 3).map((topic, idx) => (
                              <li key={idx} className="flex items-start text-gray-300 text-xs">
                                <span className="text-purple-400 mr-2 mt-0.5">•</span>
                                <span className="line-clamp-1">{topic}</span>
                              </li>
                            ))}
                          </ul>
                          {course.advancedTopics.length > 3 && (
                            <p className="text-gray-500 text-xs mt-2">+{course.advancedTopics.length - 3} more topics</p>
                          )}
                        </div>
                      )}

                      {/* View Details Button */}
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                        View Full Details
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">Loading courses...</p>
                </div>
              )}
            </div>
          )}

          {(degrees.length === 0 && courses.length === 0) && (
            <div className="text-center py-20">
              <div className="bg-slate-800 bg-opacity-50 rounded-2xl p-8 max-w-2xl mx-auto border border-purple-500 border-opacity-20">
                <svg className="w-16 h-16 mx-auto text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">No Courses Available Yet</h3>
                <p className="text-gray-400 mb-4">
                  {user?.role === 'undergraduate' 
                    ? `We couldn't find any courses for ${user?.branch || 'your branch'}. This might be because:`
                    : 'No content available yet.'}
                </p>
                {user?.role === 'undergraduate' && (
                  <div className="text-left bg-slate-700 bg-opacity-30 rounded-lg p-4 mt-4">
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• The database needs to be seeded with course data</li>
                      <li>• Your branch name might not match available courses</li>
                      <li>• You may need to log out and register with a valid branch</li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-purple-500 border-opacity-20">
                      <p className="text-purple-300 text-sm font-semibold mb-2">Available branches:</p>
                      <p className="text-gray-400 text-xs">Computer Science and Engineering, Mechanical Engineering, Electrical Engineering, Civil Engineering, Electronics and Communication Engineering</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
