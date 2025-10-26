// Context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (savedUser && isAuthenticated === 'true') {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Simulate API call
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          joinedDate: new Date().toISOString(),
          plan: 'free' // free, pro, business
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        toast.success(`Welcome back, ${userData.name}!`);
      }, 1000);
      
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      // Simulate API call
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          email,
          name,
          joinedDate: new Date().toISOString(),
          plan: 'free',
          tasksCompleted: 0,
          streak: 1
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        toast.success(`Welcome to MyTasks, ${name}! 🎉`);
      }, 1000);
      
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('tasks'); // Clear tasks on logout
    toast.info('Logged out successfully');
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};