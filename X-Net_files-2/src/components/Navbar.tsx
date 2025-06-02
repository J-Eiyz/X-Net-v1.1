import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">X</span>
                </div>
                <span className="ml-2 text-white text-lg font-bold">X-Net</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/community" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Community
                </Link>
                {isAuthenticated && (
                  <>
                    <Link to="/chat" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      Chat
                    </Link>
                    <Link to="/combos" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      My Combos
                    </Link>
                    <Link to="/ai-assistant" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      AI Assistant
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <button 
                      onClick={() => navigate('/profile')}
                      className="flex items-center max-w-xs text-sm rounded-full focus:outline-none"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'}
                        alt="User"
                      />
                      <span className="ml-2 text-white">{user?.username}</span>
                    </button>
                    <button 
                      onClick={logout} 
                      className="ml-4 text-gray-300 hover:text-white p-1"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/community"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Community
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/chat"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Chat
              </Link>
              <Link
                to="/combos"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                My Combos
              </Link>
              <Link
                to="/ai-assistant"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                AI Assistant
              </Link>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-800">
          {isAuthenticated ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'}
                  alt="User"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user?.username}</div>
                <div className="text-sm font-medium text-gray-400">{user?.email}</div>
              </div>
            </div>
          ) : (
            <div className="px-5">
              <Link
                to="/login"
                className="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <button 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }} 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
 