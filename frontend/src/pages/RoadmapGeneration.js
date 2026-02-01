import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const RoadmapGeneration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedSkills, setExpandedSkills] = useState({});
  const [saving, setSaving] = useState(false);

  // Get the generation data from location state
  const generationData = location.state?.generationData;

  useEffect(() => {
    if (generationData) {
      generateRoadmap(generationData);
    } else {
      toast.error('No generation data provided');
      navigate('/dashboard');
    }
  }, []);

  const generateRoadmap = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/roadmaps/generate`,
        {
          interests: data.interests,
          focus: data.focus,
          branch: user?.branch,
          role: user?.role,
        }
      );
      setRoadmap(response.data);
      toast.success('Roadmap generated successfully!');
    } catch (error) {
      console.error('Generate error:', error);
      toast.error('Failed to generate roadmap');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRoadmap = async () => {
    if (!roadmap) return;
    
    setSaving(true);
    try {
      // Prepare the roadmap data with only the fields the backend expects
      const roadmapData = {
        title: roadmap.title,
        phases: roadmap.phases,
        branch: roadmap.branch,
        interests: roadmap.interests,
        focus: roadmap.focus,
      };
      
      await axios.post(`${process.env.REACT_APP_API_URL}/roadmaps/save`, roadmapData);
      toast.success('Roadmap saved successfully!');
      navigate('/roadmaps');
    } catch (error) {
      console.error('Save error:', error);
      toast.error(error.response?.data?.error || 'Failed to save roadmap');
    } finally {
      setSaving(false);
    }
  };

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const toggleSkill = (stepIndex, skillIndex) => {
    const key = `${stepIndex}-${skillIndex}`;
    setExpandedSkills(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-800 mt-6 text-xl font-semibold">Generating your personalized roadmap...</p>
          <p className="text-gray-500 mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Dot Pattern Background */}
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.1,
          zIndex: 0
        }}
      />

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-black text-gray-900 mb-1">{roadmap.title}</h1>
            <p className="text-gray-600">Click on steps to explore skills and resources</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveRoadmap}
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Roadmap
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12" style={{ zIndex: 1 }}>
        <div className="space-y-16">
          {roadmap.phases?.map((phase, stepIndex) => (
            <div key={stepIndex} className="relative">
              {/* Main Step Node */}
              <div className="flex items-start gap-8">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer transition-all duration-300 shadow-lg ${
                      expandedSteps[stepIndex] 
                        ? 'bg-purple-600 shadow-purple-500/50 scale-110' 
                        : 'bg-gray-800 hover:bg-gray-700 hover:scale-105'
                    }`}
                    onClick={() => toggleStep(stepIndex)}
                  >
                    {stepIndex + 1}
                  </div>
                  {stepIndex < roadmap.phases.length - 1 && (
                    <div className="w-1 h-32 bg-gray-300 my-2" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div 
                    className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      expandedSteps[stepIndex]
                        ? 'border-purple-600 shadow-xl shadow-purple-500/20'
                        : 'border-gray-300 hover:border-gray-400 hover:shadow-lg'
                    }`}
                    onClick={() => toggleStep(stepIndex)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {phase.milestone}
                        </h3>
                        {phase.duration && (
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                            {phase.duration}
                          </span>
                        )}
                      </div>
                      <div className={`text-3xl text-gray-400 transition-transform duration-300 ${expandedSteps[stepIndex] ? 'rotate-90' : ''}`}>
                        →
                      </div>
                    </div>
                  </div>

                  {/* Skills Branch - Level 2 */}
                  {expandedSteps[stepIndex] && phase.skills && (
                    <div className="mt-6 ml-8 space-y-4">
                      <div className="flex items-center gap-2 text-purple-700 font-semibold mb-4">
                        <div className="w-8 h-0.5 bg-purple-400" />
                        <span>Skills to Master</span>
                      </div>
                      {phase.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="relative">
                          <div className="flex items-start gap-4">
                            {/* Branch Line */}
                            <div className="flex flex-col items-center pt-2">
                              <div className="w-2 h-2 rounded-full bg-purple-400" />
                              {skillIndex < phase.skills.length - 1 && (
                                <div className="w-0.5 h-12 bg-purple-200 my-1" />
                              )}
                            </div>

                            {/* Skill Node */}
                            <div className="flex-1">
                              <div
                                className={`bg-white border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                                  expandedSkills[`${stepIndex}-${skillIndex}`]
                                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                                    : 'border-purple-200 hover:border-purple-400 hover:shadow-md'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSkill(stepIndex, skillIndex);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-900 font-semibold">{skill}</p>
                                  <div className={`text-xl text-gray-400 transition-transform duration-300 ${expandedSkills[`${stepIndex}-${skillIndex}`] ? 'rotate-90' : ''}`}>
                                    →
                                  </div>
                                </div>
                              </div>

                              {/* Resources Branch - Level 3 */}
                              {expandedSkills[`${stepIndex}-${skillIndex}`] && phase.resources && (
                                <div className="mt-4 ml-8 space-y-2">
                                  <div className="flex items-center gap-2 text-blue-600 font-semibold mb-3 text-sm">
                                    <div className="w-6 h-0.5 bg-blue-300" />
                                    <span>Learning Resources</span>
                                  </div>
                                  {phase.resources.map((resource, resIndex) => (
                                    <div key={resIndex} className="flex items-center gap-3">
                                      {/* Resource Dot */}
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                      
                                      {/* Resource Card */}
                                      <a
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 hover:shadow-md transition-all group"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <span className="text-blue-600 text-xs font-bold uppercase tracking-wide">
                                              {resource.type}
                                            </span>
                                            <p className="text-gray-800 font-medium text-sm mt-1">
                                              {resource.name}
                                            </p>
                                          </div>
                                          <span className="text-blue-500 group-hover:translate-x-1 transition-transform">
                                            ↗
                                          </span>
                                        </div>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-16 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            How to Navigate:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900">Main Steps</p>
                <p className="text-gray-600">Click to view skills</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 border-2 border-purple-400 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Skills</p>
                <p className="text-gray-600">Click to view resources</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border-2 border-blue-400 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Resources</p>
                <p className="text-gray-600">Click to open links</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGeneration;
