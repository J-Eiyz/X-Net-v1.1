import  { useState } from 'react';
import { Edit, User, Calendar, Star, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { BeybladeCombo } from '../types';

// Mock data for user combos
const mockCombos: BeybladeCombo[] = [
  {
    id: '1',
    name: 'Galaxy Destroyer',
    blade: 'Galaxy Blade',
    ratchet: '5-60S',
    bit: 'F',
    tags: ['Attack', 'Stamina'],
    wins: 42,
    losses: 12,
    userId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Phantom Force',
    blade: 'Shadow Blade',
    ratchet: '3-75A',
    bit: 'B',
    tags: ['Defense', 'Balance'],
    wins: 36,
    losses: 8,
    userId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dragon Storm',
    blade: 'Dran Sword',
    ratchet: '4-88F',
    bit: 'A',
    tags: ['Attack'],
    wins: 29,
    losses: 15,
    userId: '1',
    createdAt: new Date().toISOString()
  }
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'combos' | 'stats' | 'settings'>('combos');
  
  if (!user) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600"></div>
            <div className="absolute bottom-0 left-0 p-6 flex items-end">
              <div className="mr-6">
                <img 
                  src={user.avatar || 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff'} 
                  alt={user.username} 
                  className="h-24 w-24 rounded-full border-4 border-black"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{user.username}</h1>
                <div className="flex items-center text-blue-200 text-sm mt-1">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{user.role}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <button className="absolute top-4 right-4 p-2 bg-gray-900/50 rounded-full hover:bg-gray-900/80 transition-colors">
              <Edit className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        
        <div className="flex border-b border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab('combos')}
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'combos'
                ? 'border-b-2 border-blue-600 text-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Combos
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'stats'
                ? 'border-b-2 border-blue-600 text-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Battle Stats
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-b-2 border-blue-600 text-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Settings
          </button>
        </div>
        
        {activeTab === 'combos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCombos.map(combo => (
              <div key={combo.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white mb-2">{combo.name}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <Star className="h-4 w-4 text-blue-500 mr-1" />
                      <span>{combo.wins} wins</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex">
                      <span className="w-20 text-xs text-gray-500">Blade</span>
                      <span className="text-white">{combo.blade}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-xs text-gray-500">Ratchet</span>
                      <span className="text-white">{combo.ratchet}</span>
                    </div>
                    <div className="flex">
                      <span className="w-20 text-xs text-gray-500">Bit</span>
                      <span className="text-white">{combo.bit}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {combo.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-xs px-2 py-1 rounded-full ${
                          tag === 'Attack' ? 'bg-red-900/50 text-red-400' :
                          tag === 'Defense' ? 'bg-blue-900/50 text-blue-400' :
                          tag === 'Stamina' ? 'bg-green-900/50 text-green-400' :
                          'bg-purple-900/50 text-purple-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex border-t border-gray-800">
                  <button className="flex-1 text-center py-3 text-sm text-gray-400 hover:bg-gray-800 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 text-center py-3 text-sm text-gray-400 hover:bg-gray-800 transition-colors border-l border-gray-800">
                    View Stats
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Battle Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Total Battles</div>
                <div className="text-2xl font-bold text-white">143</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Win Rate</div>
                <div className="text-2xl font-bold text-green-400">68%</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Tournament Rank</div>
                <div className="text-2xl font-bold text-blue-400">#24</div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-white mb-3">Win/Loss by Type</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-red-400">Attack</span>
                    <span className="text-xs text-gray-400">45 wins / 15 losses</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-blue-400">Defense</span>
                    <span className="text-xs text-gray-400">32 wins / 18 losses</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-green-400">Stamina</span>
                    <span className="text-xs text-gray-400">20 wins / 8 losses</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-purple-400">Balance</span>
                    <span className="text-xs text-gray-400">10 wins / 5 losses</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={user.username}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-lg font-medium text-white mb-4">Danger Zone</h3>
                
                <button 
                  onClick={logout}
                  className="flex items-center px-4 py-2 bg-gray-800 text-red-500 rounded-md hover:bg-gray-700 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </button>
                
                <button className="mt-4 px-4 py-2 bg-red-900/30 text-red-500 rounded-md hover:bg-red-900/50 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 