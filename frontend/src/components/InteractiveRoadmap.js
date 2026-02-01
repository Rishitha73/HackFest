import React, { useState } from 'react';

const InteractiveRoadmap = ({ roadmap, onClose }) => {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedSkills, setExpandedSkills] = useState({});

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

  if (!roadmap) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      {/* Dot Pattern Background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          opacity: 0.1
        }}
      />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">{roadmap.title}</h1>
            <p className="text-gray-600 mt-1">Click on steps to explore skills and resources</p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-16">
          {roadmap.phases?.map((phase, stepIndex) => (
            <div key={stepIndex} className="relative">
              {/* Main Step Node */}
              <div className="flex items-start gap-8">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer transition-all duration-300 ${
                      expandedSteps[stepIndex] 
                        ? 'bg-purple-600 shadow-lg shadow-purple-500/50 scale-110' 
                        : 'bg-gray-800 hover:bg-gray-700'
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
                        ? 'border-purple-600 shadow-xl'
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
                      <div className={`text-3xl transition-transform duration-300 ${expandedSteps[stepIndex] ? 'rotate-90' : ''}`}>
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
                                    ? 'border-blue-500 shadow-lg'
                                    : 'border-purple-200 hover:border-purple-400 hover:shadow-md'
                                }`}
                                onClick={() => toggleSkill(stepIndex, skillIndex)}
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-gray-900 font-semibold">{skill}</p>
                                  <div className={`text-xl transition-transform duration-300 ${expandedSkills[`${stepIndex}-${skillIndex}`] ? 'rotate-90' : ''}`}>
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
          <h4 className="font-bold text-gray-900 mb-4">How to Navigate:</h4>
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

export default InteractiveRoadmap;
