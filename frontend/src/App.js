import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Degrees from './pages/Degrees';
import DegreeDetail from './pages/DegreeDetail';
import BranchDetail from './pages/BranchDetail';
import Tasks from './pages/Tasks';
import CourseDetail from './pages/CourseDetail';
import Roadmaps from './pages/Roadmaps';
import RoadmapDetail from './pages/RoadmapDetail';
import RoadmapGeneration from './pages/RoadmapGeneration';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: '/degree/:degreeId', element: <DegreeDetail /> },
  { path: '/branch/:branchId', element: <ProtectedRoute><BranchDetail /></ProtectedRoute> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/course/:courseId', element: <ProtectedRoute><CourseDetail /></ProtectedRoute> },
  { path: '/roadmaps', element: <ProtectedRoute><Roadmaps /></ProtectedRoute> },
  { path: '/roadmap/:roadmapId', element: <ProtectedRoute><RoadmapDetail /></ProtectedRoute> },
  { path: '/generate-roadmap', element: <ProtectedRoute><RoadmapGeneration /></ProtectedRoute> },
  { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
  { path: '*', element: <NotFound /> },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
