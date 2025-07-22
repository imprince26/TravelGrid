import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: 1,
      email: 'demo@travelgrid.com',
      password: 'password123',
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      email: 'jane@travelgrid.com',
      password: 'password123',
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    }
  ];

  // Check for stored user session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('travelgrid_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('travelgrid_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    ) || localStorage.getItem('travelgrid_user') && JSON.parse(localStorage.getItem('travelgrid_user'));
    
    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        avatar: foundUser.avatar
      };
      
      setUser(userSession);
      localStorage.setItem('travelgrid_user', JSON.stringify(userSession));
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const emailExists = mockUsers.some(u => u.email === userData.email);
    
    if (emailExists) {
      setIsLoading(false);
      return { success: false, error: 'Email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      password: userData.password,
      avatar: `https://randomuser.me/api/portraits/${userData.name.toLowerCase().includes('jane') || userData.name.toLowerCase().includes('maria') ? 'women' : 'men'}/${Math.floor(Math.random() * 90) + 1}.jpg`
    };
    
    setUser(newUser);
    localStorage.setItem('travelgrid_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelgrid_user');
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};