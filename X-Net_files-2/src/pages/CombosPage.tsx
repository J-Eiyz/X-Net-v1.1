import  { useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import ComboCard from '../components/ComboCard';
import { BeybladeCombo } from '../types';

// Mock data for combos
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
  },
  {
    id: '4',
    name: 'Cyber Whirlwind',
    blade: 'Cyber Wing',
    ratchet: '4-55B',
    bit: 'S',
    tags: ['Stamina', 'Balance'],
    wins: 53,
    losses: 21,
    userId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Phoenix Blaze',
    blade: 'Phoenix Blade',
    ratchet: '3-70B',
    bit: 'A',
    tags: ['Attack', 'Balance'],
    wins: 38,
    losses: 11,
    userId: '1',
    createdAt: new Date().toISOString()
  }
];

export default function CombosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  
  const filteredCombos = mockCombos.filter(combo => {
    // Apply search term filter
    const matchesSearch = searchTerm === '' || 
      combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      combo.blade.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply tag filter
    const matchesTag = filterTag === null || combo.tags.includes(filterTag);
    
    return matchesSearch && matchesTag;
  });
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">My Beyblade Combos</h1>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            New Combo
          </button>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg block w-full pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search combos..."
            />
          </div>
          
          <div className="dropdown relative">
            <button className="flex items-center px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="h-5 w-5 mr-2" />
              {filterTag || 'Filter by Type'}
            </button>
            <div className="dropdown-menu absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg hidden">
              <div className="py-1">
                <button 
                  onClick={() => setFilterTag(null)} 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  All Types
                </button>
                <button 
                  onClick={() => setFilterTag('Attack')} 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  Attack
                </button>
                <button 
                  onClick={() => setFilterTag('Defense')} 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  Defense
                </button>
                <button 
                  onClick={() => setFilterTag('Stamina')} 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  Stamina
                </button>
                <button 
                  onClick={() => setFilterTag('Balance')} 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  Balance
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {filteredCombos.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-400">No combos found. Try a different search term or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCombos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 