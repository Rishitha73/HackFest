import React from 'react'
import { Link } from 'react-router-dom'

export default function FloatingRoadmapButton({ to = '/roadmaps', label = 'Create Roadmap' }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to={to} className="inline-flex items-center justify-center px-4 py-3 bg-accent text-white rounded-full shadow-lg hover:scale-105 transform transition">
        <span className="sr-only">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  )
}
