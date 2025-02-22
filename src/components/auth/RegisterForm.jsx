import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {authAPI} from "../../api/auth"
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { confirmPassword, ...registerData } = data;

      console.log(registerData);
      
      const response = await authAPI.registerUser(registerData);
        if(response.status)
        {
            toast.success("Account created.");      
            setTimeout(() => {
                navigate('/login')
                setIsLoading(false);
            }, 3000);
        }
        
    } catch (e) {
      toast.error(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
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
            Create your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  {...register('firstName', {
                    required: 'First name is required'
                  })}
                  type="text"
                  placeholder="First name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B55] ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <input
                  {...register('lastName', {
                    required: 'Last name is required'
                  })}
                  type="text"
                  placeholder="Last name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B55] ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

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
                placeholder="Create password"
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

            <div>
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match'
                })}
                type="password"
                placeholder="Confirm password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4B55] ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-[#FF4B55] hover:text-[#E63E47] font-medium"
              >
                Login here
              </a>
            </p>

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
                'Create Account'
              )}
            </button>
          </form>


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

export default RegisterForm;