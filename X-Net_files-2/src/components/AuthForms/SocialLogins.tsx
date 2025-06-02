import  { Facebook, Mail, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SocialLogins() {
  const { loginWithGoogle, loginWithFacebook, continueAsGuest, isLoading } = useAuth();
  
  return (
    <div className="p-6 space-y-4 md:space-y-6 border-t border-gray-800 sm:p-8">
      <h2 className="text-lg font-medium text-white text-center">
        Or continue with
      </h2>
      
      <div className="space-y-3">
        <button
          onClick={loginWithGoogle}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Mail className="mr-2 h-5 w-5" />
          <span>Continue with Google</span>
        </button>
        
        <button
          onClick={loginWithFacebook}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Facebook className="mr-2 h-5 w-5" />
          <span>Continue with Facebook</span>
        </button>
        
        <button
          onClick={continueAsGuest}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <User className="mr-2 h-5 w-5" />
          <span>Continue as Guest</span>
        </button>
      </div>
      
      {isLoading && (
        <div className="text-center text-sm text-gray-400">
          Loading...
        </div>
      )}
    </div>
  );
}
 