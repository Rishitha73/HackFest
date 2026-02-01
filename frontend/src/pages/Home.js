import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-4 py-2 bg-purple-500 bg-opacity-20 rounded-full border border-purple-400 border-opacity-50">
              <span className="text-purple-300 text-sm font-semibold">✨ The Future of Academic Guidance</span>
            </div>
            <h1 className="text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              RoadmapAI
            </h1>
            <h2 className="text-3xl font-bold mb-6 text-gray-200">
              Navigate Your Academic & Career Path with Intelligence
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              Discover your perfect academic path. Whether you're exploring degrees or diving into specialized courses, get personalized AI-powered roadmaps, 7-day trials, and real-world projects.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {user ? (
                <Link
                  to="/dashboard"
                  className="group relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10">Go to Dashboard →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="relative z-10">Get Started Free</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 text-lg font-bold text-purple-300 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-purple-400 border-opacity-50 hover:bg-opacity-20 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
              {
                icon: "🔍",
                title: "Explore Degrees",
                desc: "Browse 50+ degree programs with detailed branches, job prospects, and requirements.",
                gradient: "from-blue-600 to-cyan-600"
              },
              {
                icon: "📝",
                title: "7-Day Trials",
                desc: "Get hands-on with structured tasks before committing. Build real projects with confidence.",
                gradient: "from-purple-600 to-pink-600"
              },
              {
                icon: "🤖",
                title: "AI Roadmaps",
                desc: "Personalized 4-year learning paths with milestones, skills, and curated resources.",
                gradient: "from-orange-600 to-red-600"
              }
            ].map((feature, i) => (
              <div key={i} className={`group relative bg-gradient-to-br ${feature.gradient} p-0.5 rounded-2xl cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                <div className="relative bg-slate-900 rounded-2xl p-8 h-full">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Problem & Solution Section */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-10 blur-2xl"></div>
            <div className="relative bg-slate-800 bg-opacity-50 backdrop-blur-xl rounded-3xl border border-purple-500 border-opacity-20 p-12">
              <h3 className="text-4xl font-bold mb-8 text-center text-white">Why RoadmapAI?</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-red-400 mb-4">❌ The Problem</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Unclear academic paths and future prospects</li>
                    <li>• Outdated course information</li>
                    <li>• No hands-on exposure before commitment</li>
                    <li>• Wasted time on wrong career paths</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-green-400 mb-4">✅ Our Solution</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li>• Try before you commit with 7-day trials</li>
                    <li>• AI-generated personalized roadmaps</li>
                    <li>• Real-world projects and resources</li>
                    <li>• Guidance tailored to your interests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h3 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Future?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join thousands of students building their perfect academic path</p>
            <Link
              to="/register"
              className="inline-block px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Journey Now →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
