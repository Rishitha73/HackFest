import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import RoadmapGenerator from '../components/RoadmapGenerator';
import InteractiveRoadmap from '../components/InteractiveRoadmap';
import { toast } from 'react-toastify';

const BranchDetail = () => {
  const { branchId } = useParams();
  const [branch, setBranch] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBranchDetails();
  }, [branchId]);

  const fetchBranchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/degrees/branch/${branchId}`
      );
      setBranch(response.data);
    } catch (error) {
      toast.error('Failed to load branch details');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async (data) => {
    setGeneratingRoadmap(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/roadmaps/generate`,
        {
          role: user?.role || 'pre-university',
          branch: branch?.name,
          interests: data.interests,
          focus: data.focus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setRoadmap(response.data);
      setShowRoadmap(true); // Open the interactive roadmap view
      toast.success('Roadmap generated successfully!');
    } catch (error) {
      console.error('Roadmap generation error:', error);
      toast.error(error.response?.data?.error || 'Failed to generate roadmap');
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const handleSaveRoadmap = async () => {
    if (!roadmap) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/roadmaps/save`,
        {
          title: roadmap.title,
          phases: roadmap.phases,
          branch: branch?.name,
          interests: roadmap.interests,
          focus: roadmap.focus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('Roadmap saved to your profile!');
      navigate('/roadmaps');
    } catch (error) {
      console.error('Save roadmap error:', error);
      toast.error(error.response?.data?.error || 'Failed to save roadmap');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-purple-500 border-opacity-30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-300 mt-4">Loading branch details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <RoadmapGenerator onGenerate={handleGenerateRoadmap} loading={generatingRoadmap} />
      
      {/* Interactive Roadmap Overlay */}
      {showRoadmap && roadmap && (
        <InteractiveRoadmap 
          roadmap={roadmap} 
          onClose={() => setShowRoadmap(false)}
        />
      )}

      {!showRoadmap && (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg border border-purple-500 border-opacity-30 text-purple-300 hover:text-purple-200 transition-all duration-300"
          >
            <span className="mr-2">←</span> Back
          </button>

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-5xl font-black text-white mb-4">{branch?.name}</h1>
            <p className="text-gray-400 text-lg mb-6">{branch?.overview}</p>
            {branch?.detailedDescription && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-6">
                <p className="text-gray-300 leading-relaxed">{branch.detailedDescription}</p>
              </div>
            )}
          </div>

          {/* Eligibility and Prerequisites */}
          {(branch?.eligibility || branch?.prerequisites) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {branch?.eligibility && (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-blue-500 border-opacity-20 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    Eligibility
                  </h3>
                  <p className="text-gray-300">{branch.eligibility}</p>
                </div>
              )}
              {branch?.prerequisites && branch.prerequisites.length > 0 && (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-blue-500 border-opacity-20 p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    Prerequisites
                  </h3>
                  <ul className="space-y-2">
                    {branch.prerequisites.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <span className="text-blue-400 mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* What You'll Learn */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
              <ul className="space-y-3">
                {branch?.whatYouLearn?.map((item, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <span className="text-green-400 mr-3 font-bold text-lg">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Job Prospects */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Job Prospects</h2>
              <ul className="space-y-3">
                {branch?.jobProspects?.map((item, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-3 font-bold text-lg">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills Required */}
          {branch?.skills && branch.skills.length > 0 && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Essential Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {branch.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center bg-slate-700 bg-opacity-30 rounded-lg p-3">
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Career Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {branch?.averageSalary && (
              <div className="bg-gradient-to-br from-green-900 to-slate-900 rounded-2xl border border-green-500 border-opacity-20 p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  Average Salary
                </h3>
                <p className="text-gray-300 leading-relaxed">{branch.averageSalary}</p>
              </div>
            )}
            {branch?.careerGrowth && (
              <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  Career Growth
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">{branch.careerGrowth}</p>
              </div>
            )}
          </div>

          {/* Industry Trends */}
          {branch?.industryTrends && (
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl border border-blue-500 border-opacity-20 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                Industry Trends
              </h2>
              <p className="text-gray-300 leading-relaxed">{branch.industryTrends}</p>
            </div>
          )}

          {/* Top Recruiters */}
          {branch?.topRecruiters && branch.topRecruiters.length > 0 && (
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-8 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Top Recruiters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {branch.topRecruiters.map((recruiter, idx) => (
                  <div key={idx} className="bg-slate-700 bg-opacity-30 rounded-lg p-4 border border-purple-500 border-opacity-10 text-center">
                    <span className="text-gray-300 text-sm">{recruiter}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7-Day Trial Tasks */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-purple-500 border-opacity-20 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">7-Day Trial Tasks</h2>
            <div className="space-y-3">
              {branch?.trialTasks?.map((task, idx) => (
                <div key={idx} className="flex items-start bg-slate-700 bg-opacity-30 rounded-lg p-4 border border-purple-500 border-opacity-10">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full text-white font-bold text-sm mr-4 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-300 pt-1">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Roadmap */}
          {roadmap && (
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl border border-green-500 border-opacity-30 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white flex items-center">
                  Your Personalized Roadmap
                </h2>
                <span className="text-green-400 text-sm">AI Generated</span>
              </div>
              <h3 className="text-xl text-gray-300 mb-6">{roadmap.title}</h3>
              
              <div className="space-y-6 mb-8">
                {roadmap.phases?.map((phase, idx) => (
                  <div key={idx} className="bg-slate-800 bg-opacity-50 rounded-xl p-6 border-l-4 border-green-500 hover:border-green-400 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Phase {idx + 1}: {phase.milestone}
                      </h3>
                      {phase.duration && (
                        <span className="text-green-400 text-sm font-semibold bg-green-900 bg-opacity-30 px-3 py-1 rounded-full">
                          {phase.duration}
                        </span>
                      )}
                    </div>
                    
                    {phase.skills && phase.skills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-purple-300 font-semibold mb-2">Key Skills to Develop:</p>
                        <ul className="space-y-2">
                          {phase.skills.map((skill, sidx) => (
                            <li key={sidx} className="flex items-start text-gray-300">
                              <span className="text-green-400 mr-2">✓</span>
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {phase.resources && phase.resources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-blue-300 font-semibold mb-3">Recommended Resources:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.resources.map((resource, ridx) => (
                            <a
                              key={ridx}
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between bg-slate-700 bg-opacity-40 rounded-lg p-3 hover:bg-opacity-60 transition-all group"
                            >
                              <div>
                                <span className="text-blue-400 text-sm font-semibold block">{resource.type}</span>
                                <span className="text-gray-300 text-sm">{resource.name}</span>
                              </div>
                              <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleSaveRoadmap}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Save This Roadmap to Your Profile
              </button>
            </div>
          )}

          {/* View Generated Roadmap Button */}
          {roadmap && !showRoadmap && (
            <div className="mt-8">
              <button
                onClick={() => setShowRoadmap(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
              >
                <span>View Interactive Roadmap</span>
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </>
  );
};

export default BranchDetail;
