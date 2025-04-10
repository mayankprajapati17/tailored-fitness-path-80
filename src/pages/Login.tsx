
import React from 'react';
import Navbar from '@/components/Navbar';
import Auth from '@/components/Auth';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Student Job Tracker
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Track your job applications and stay organized
          </p>
          <div className="mt-5 text-center">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Sign up or log in to get started!
            </span>
          </div>
        </div>
        
        <Auth />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you can track your job applications across devices.
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Your data is securely stored in MongoDB Atlas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
