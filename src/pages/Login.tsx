
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
        </div>
        
        <Auth />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            By signing in, you can track your job applications across devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
