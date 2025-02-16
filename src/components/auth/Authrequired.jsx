import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

const AuthRequired = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#151515] flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white mb-2">
          Authentication required
        </h2>
        <p className="text-white mb-6">
          Please log in to access this page.
        </p>
        <Button
          variant="white"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AuthRequired;