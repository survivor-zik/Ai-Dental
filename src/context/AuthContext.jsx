import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/auth';
import { Toaster, toast } from 'sonner';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);

      setTimeout(() => {
        toast.warn("Authentication required!")   
      }, 3000);
      setIsLoading(false);
      return;
    }

    try {
      const { valid } = await authAPI.verifyToken(token);
      setIsAuthenticated(valid);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const result = await authAPI.login(credentials);
      if (result.success) {
        toast.success("Login successful!")     
        setTimeout(() => {
          setIsAuthenticated(true);
          navigate('/apikeys');
        }, 2000);
      }
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      error,
      login,
      logout
    }}>
      {children}
      <Toaster visibleToasts={1} richColors position='bottom-center'/>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};