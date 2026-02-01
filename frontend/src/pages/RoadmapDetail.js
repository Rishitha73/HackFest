import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { toast } from 'react-toastify';

const RoadmapDetail = () => {
  const { roadmapId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(location.state?.roadmap || null);
  const [loading, setLoading] = useState(!location.state?.roadmap);
  const [expandedPhase, setExpandedPhase] = useState(null);

  useEffect(() => {
    if (!roadmap && roadmapId) {
      fetchRoadmap();
    }
  }, [roadmapId]);

  const fetchRoadmap = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/roadmaps/${roadmapId}`);
      setRoadmap(response.data);
    } catch (error) {
      toast.error('Failed to load roadmap');
      navigate('/roadmaps');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-purple-500 border-opacity-30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-300 mt-4">Loading your roadmap...</p>
          </div>
        </div>
      </>
    );
  }

  if (!roadmap) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-300 text-xl mb-6">Roadmap not found</p>
            <button
              onClick={() => navigate('/roadmaps')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Back to My Roadmaps
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate('/roadmaps')}
            className="mb-8 inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-purple-500 border-opacity-30 text-purple-300 hover:text-purple-200 transition-all duration-300 font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Roadmaps
          </button>

          {/* Roadmap Timeline */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-green-500 border-opacity-30 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"></div>
            
            <div className="p-8 md:p-10">
              {/* Roadmap Header */}
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-600 bg-opacity-20 mr-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-black text-white">{roadmap.title}</h1>
                  <p className="text-gray-400 mt-1">Your personalized learning journey</p>
                </div>
              </div>

              {/* Roadmap Meta */}
              <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-green-500 border-opacity-20">
                {roadmap.interests && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 bg-opacity-20 rounded-lg border border-blue-500 border-opacity-30">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-blue-300 text-sm font-semibold">{roadmap.interests}</span>
                  </div>
                )}
                {roadmap.focus && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-600 bg-opacity-20 rounded-lg border border-purple-500 border-opacity-30">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-purple-300 text-sm font-semibold">{roadmap.focus}</span>
                  </div>
                )}
                {roadmap.branch && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-pink-600 bg-opacity-20 rounded-lg border border-pink-500 border-opacity-30">
                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    <span className="text-pink-300 text-sm font-semibold">{roadmap.branch}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 bg-green-600 bg-opacity-20 rounded-lg border border-green-500 border-opacity-30">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-green-300 text-sm font-semibold">
                    Created {new Date(roadmap.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-600 via-blue-600 to-purple-600 opacity-30"></div>

                <div className="space-y-6">
                  {roadmap.phases?.map((phase, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 border-4 border-slate-800 z-10 shadow-lg"></div>

                      {/* Phase Card */}
                      <div className="ml-20">
                        <div 
                          className="bg-slate-700 bg-opacity-40 rounded-2xl border border-green-500 border-opacity-20 hover:border-opacity-50 transition-all duration-300 overflow-hidden cursor-pointer"
                          onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                        >
                          {/* Phase Header */}
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="inline-block px-3 py-1 bg-green-600 bg-opacity-20 rounded-full border border-green-500 border-opacity-50 mb-3">
                                  <span className="text-green-300 text-xs font-bold uppercase tracking-wide">Phase {idx + 1}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-2">{phase.milestone}</h3>
                                
                                {/* Duration Badge */}
                                {phase.duration && (
                                  <div className="flex items-center gap-2 mb-3">
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="text-blue-300 text-sm font-semibold">{phase.duration}</span>
                                  </div>
                                )}

                                {/* Key Skills Preview */}
                                {phase.skills && phase.skills.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {phase.skills.slice(0, 3).map((skill, sidx) => (
                                      <span key={sidx} className="px-3 py-1 bg-purple-600 bg-opacity-20 border border-purple-500 border-opacity-30 rounded-full text-purple-300 text-xs font-semibold">
                                        {skill}
                                      </span>
                                    ))}
                                    {phase.skills.length > 3 && (
                                      <span className="px-3 py-1 bg-purple-600 bg-opacity-20 border border-purple-500 border-opacity-30 rounded-full text-purple-300 text-xs font-semibold">
                                        +{phase.skills.length - 3} more
                                      </span>
                                    )}
                                  </div>
                                )}

                                <p className="text-sm text-gray-400 flex items-center gap-2">
                                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                  </svg>
                                  {expandedPhase === idx ? 'Click to collapse' : `Click to view ${phase.resources?.length || 0} learning resources`}
                                </p>
                              </div>

                              {/* Expand Icon */}
                              <svg 
                                className={`w-8 h-8 text-green-400 flex-shrink-0 transition-transform duration-300 ${expandedPhase === idx ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>

                          {/* Expanded Skills & Resources */}
                          {expandedPhase === idx && (
                            <div className="border-t border-green-500 border-opacity-20 bg-slate-800 bg-opacity-50 p-6 animate-fadeIn">
                              {/* All Skills */}
                              {phase.skills && phase.skills.length > 0 && (
                                <div className="mb-6">
                                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    Key Skills to Master
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {phase.skills.map((skill, sidx) => (
                                      <div key={sidx} className="flex items-start gap-3 bg-slate-700 bg-opacity-40 rounded-lg p-3 border border-purple-500 border-opacity-20">
                                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                        </svg>
                                        <span className="text-gray-200 text-sm font-medium">{skill}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Learning Resources */}
                              {phase.resources && phase.resources.length > 0 && (
                                <div>
                                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                    Learning Resources
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {phase.resources.map((resource, ridx) => (
                                      <a
                                        key={ridx}
                                        href={resource.link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-4 bg-slate-700 bg-opacity-40 rounded-xl p-4 border border-blue-500 border-opacity-20 hover:border-opacity-50 hover:bg-opacity-60 transition-all duration-300 group/resource"
                                      >
                                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 bg-opacity-20 flex-shrink-0 group-hover/resource:bg-opacity-30 transition-all">
                                          {resource.type?.toLowerCase().includes('youtube') || resource.type?.toLowerCase().includes('video') ? (
                                            <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                            </svg>
                                          ) : resource.type?.toLowerCase().includes('course') ? (
                                            <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                            </svg>
                                          ) : (
                                            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                            </svg>
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="text-white font-semibold mb-1 group-hover/resource:text-blue-300 transition-colors leading-tight">
                                            {resource.name || resource.type}
                                          </h5>
                                          <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                              resource.type?.toLowerCase().includes('youtube') || resource.type?.toLowerCase().includes('video') 
                                                ? 'bg-red-600 bg-opacity-20 text-red-300 border border-red-500 border-opacity-30'
                                                : resource.type?.toLowerCase().includes('course')
                                                ? 'bg-green-600 bg-opacity-20 text-green-300 border border-green-500 border-opacity-30'
                                                : 'bg-blue-600 bg-opacity-20 text-blue-300 border border-blue-500 border-opacity-30'
                                            }`}>
                                              {resource.type}
                                            </span>
                                          </div>
                                        </div>
                                        <svg className="w-5 h-5 text-blue-400 opacity-0 group-hover/resource:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoadmapDetail;
