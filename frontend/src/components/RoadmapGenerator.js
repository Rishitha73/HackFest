import React, { useState } from 'react';

const RoadmapGenerator = ({ onGenerate, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [interests, setInterests] = useState('');
  const [focus, setFocus] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!interests.trim() || !focus.trim()) {
      alert('Please fill in all fields');
      return;
    }
    onGenerate({
      interests: interests.split(',').map(i => i.trim()),
      focus,
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button with Tooltip */}
      <div className="fixed bottom-8 right-8 z-40">
        {/* Tooltip */}
        {isHovered && !isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-xl whitespace-nowrap animate-fadeIn">
            Generate Roadmap?
            <div className="absolute top-full right-6 -mt-1">
              <div className="border-8 border-transparent border-t-slate-800"></div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
        >
          <svg className="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          
          {/* Pulse animation ring */}
          <span className="absolute inset-0 rounded-full bg-purple-600 opacity-75 animate-ping"></span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 border border-purple-500 border-opacity-30 overflow-hidden">
            {/* Header */}
            <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
            
            <div className="p-8">
              {/* Title Section */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Generate Your Roadmap</h2>
                  <p className="text-gray-400">Create a personalized learning path tailored to your goals</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Interests Field */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    Your Interests
                  </label>
                  <input
                    type="text"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g., Web Development, AI, Mobile Apps, Data Science"
                    className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <p className="text-gray-500 text-sm mt-2">Separate multiple interests with commas</p>
                </div>

                {/* Focus Area Field */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    Focus Area
                  </label>
                  <input
                    type="text"
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    placeholder="e.g., 4-year comprehensive learning plan, Career transition, Skill upgrade"
                    className="w-full bg-slate-700 bg-opacity-50 border border-purple-500 border-opacity-30 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <p className="text-gray-500 text-sm mt-2">Describe your primary learning goal</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Roadmap
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-8 bg-slate-700 bg-opacity-50 text-gray-300 font-bold py-4 rounded-lg hover:bg-opacity-70 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoadmapGenerator;
