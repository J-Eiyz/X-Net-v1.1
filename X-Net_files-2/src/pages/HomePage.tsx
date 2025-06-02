import  { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[70vh] w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1734623046892-4a0afc9a95ad?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxiZXlibGFkZSUyMGJhdHRsZSUyMGFyZW5hfGVufDB8fHx8MTc0ODgzOTMwM3ww&ixlib=rb-4.1.0" 
            alt="Beyblade Battle Arena" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-8 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to X-Net
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              The ultimate social platform for Beyblade X enthusiasts. Connect with fellow bladers, share your combos, and dominate the arena.
            </p>
            <Link 
              to="/community" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Explore Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Unleash Your Beyblade X Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v4m0 16v-4m8-8h-4m-12 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Track Your Combos</h3>
              <p className="text-gray-400">Log and analyze your Beyblade X combinations. Keep track of wins, losses, and performance.</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Join the Community</h3>
              <p className="text-gray-400">Connect with Beyblade X enthusiasts worldwide. Share strategies, tips, and battle experiences.</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get AI Assistance</h3>
              <p className="text-gray-400">Our AI assistant helps you build better combos, offers strategy advice, and answers your questions.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Battle?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Create your profile, log your combos, and connect with Beyblade X enthusiasts around the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Account
            </Link>
            <Link 
              to="/ai-assistant" 
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
            >
              Try AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
 