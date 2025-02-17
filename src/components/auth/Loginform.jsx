import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext'; 
import { Toaster, toast } from 'sonner';
const LoginForm = () => {
 
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [isLoading , setIsLoading] = useState(false);
  const {login} = useAuth();
 
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data); 
      if (!response.success) {
        toast.error("Invalid email or password")
        setTimeout(() => {
          setIsLoading(false);    
        }, 2000);
      }
    } catch(e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex flex-1 bg-[#151515] items-center justify-center p-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-white">Dental</span>
            <span className="text-[#FF4B55]">ai</span>
          </h1>
          <p className="text-xl text-white">
            Experience the fastest inference in the world
          </p>
        </div>
      </div>

  
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
      
          <div className="md:hidden mb-8">
            <h1 className="text-4xl font-bold">
              <span className="text-[#151515]">groq</span>
              <span className="text-[#FF4B55]">cloud</span>
            </h1>
          </div>

          <h2 className="text-2xl font-semibold mb-6">
            Create account or login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                placeholder="name@example.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B55] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

           
            <div>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B55] ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF4B55] text-white rounded-lg py-2 hover:bg-[#E43E47] transition-colors disabled:bg-[#E43E47] disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Loading...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

 
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          
          <button className="w-full border border-gray-300 rounded-lg py-2 mb-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Login with GitHub
          </button>

          <button className="w-full border border-gray-300 rounded-lg py-2 mb-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            Login with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            By continuing, I accept the{' '}
            <a href="#" className="text-[#FF4B55] hover:underline">
              Terms of Sale
            </a>{' '}
            and acknowledge that I have read the{' '}
            <a href="#" className="text-[#FF4B55] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
      <Toaster visibleToasts={1} richColors position='bottom-center'/>
    </div>
  );
};

export default LoginForm;