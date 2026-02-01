import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for development
const mockDegrees = [
  {
    id: '1',
    name: 'Bachelor of Technology (B.Tech)',
    description: '4-year professional undergraduate engineering degree',
    duration: 4,
    branchesCount: 12,
    popularity: 85,
    topBranches: ['CSE', 'ECE', 'Mechanical', 'Civil'],
  },
];

const mockBranches = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    overview: 'Focuses on programming and software development',
    difficulty: 'High',
    demand: 'Very High',
    avgSalary: '₹10-20 LPA',
  },
];

// Mock API functions
export const getAllDegrees = () => Promise.resolve({ data: mockDegrees });
export const getDegreeById = (id) => Promise.resolve({ 
  data: mockDegrees.find(d => d.id === id) || mockDegrees[0]
});
export const getBranchesByDegree = () => Promise.resolve({ data: mockBranches });
export const getBranchById = (id) => Promise.resolve({ 
  data: mockBranches.find(b => b.id === id) || mockBranches[0]
});

// Auth functions
export const loginUser = (credentials) => Promise.resolve({ 
  data: { 
    token: 'mock-token', 
    user: { 
      id: '1', 
      name: 'Test User', 
      email: credentials.email || 'test@example.com',
      role: 'pre-university'
    } 
  } 
});

export const registerUser = (userData) => Promise.resolve({ 
  data: { 
    token: 'mock-token', 
    user: { 
      id: '1', 
      name: userData.name || 'New User', 
      email: userData.email || 'new@example.com',
      role: userData.role || 'pre-university',
      branch: userData.branch || ''
    } 
  } 
});

// Other endpoints (mock)
export const getCoursesByBranch = () => Promise.resolve({ data: [] });
export const getCourseById = () => Promise.resolve({ data: {} });
export const generateRoadmap = () => Promise.resolve({ data: {} });
export const getSavedRoadmaps = () => Promise.resolve({ data: [] });
export const getRoadmapById = () => Promise.resolve({ data: {} });
export const saveRoadmap = () => Promise.resolve({ data: {} });
export const updateRoadmap = () => Promise.resolve({ data: {} });
export const deleteRoadmap = () => Promise.resolve({ data: {} });
export const updateProfile = () => Promise.resolve({ data: {} });

export default api;
