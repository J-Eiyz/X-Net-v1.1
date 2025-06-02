import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/AuthForms/LoginForm';
import SignupForm from '../components/AuthForms/SignupForm';
import SocialLogins from '../components/AuthForms/SocialLogins';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
            <ArrowRight className="h-8 w-8 text-white transform rotate-45" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-white">
            X-Net
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            The Ultimate Beyblade X Social Platform
          </p>
        </div>

        <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-2">
            <button
              className={`py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`py-3 font-medium text-sm focus:outline-none ${
                activeTab === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {activeTab === 'login' ? (
              <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setActiveTab('login')} />
            )}
          </div>

          <SocialLogins />
        </div>
      </div>
    </div>
  );
}
 