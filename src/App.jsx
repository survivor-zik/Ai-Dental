import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/layout/Sidebar';
import LoginForm from './components/auth/LoginForm';
import ApiKeysPage from './components/Modules/Apikey';
import { useAuth } from './context/AuthContext';
import RegisterForm from './components/auth/RegisterForm';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm/>} /> 
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Sidebar />
                  <Routes>
                    
                    <Route path="/apikeys" element={<ApiKeysPage />} />
                    <Route path="/" element={<Navigate to="/apikeys" />} />
                  </Routes>
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;