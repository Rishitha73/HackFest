import React, { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('auth_user')
      if (stored) setUser(JSON.parse(stored))
    } catch (e) {
      // ignore
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    try {
      localStorage.setItem('auth_user', JSON.stringify(userData))
    } catch (e) {
      // ignore
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('auth_user')
    } catch (e) {
      // ignore
    }
  }

  // Add a register helper for components that call `register`.
  // This is a placeholder that immediately logs the user in; replace with real API call as needed.
  const register = async (userData) => {
    // Here you would normally call your backend to create the user,
    // e.g. await api.post('/auth/register', userData)
    login(userData)
    return Promise.resolve(userData)
  }

  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: Boolean(user),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}