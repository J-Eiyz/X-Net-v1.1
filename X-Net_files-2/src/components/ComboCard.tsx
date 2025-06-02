import  { Calendar, Star } from 'lucide-react';
import { BeybladeCombo } from '../types';

interface ComboCardProps {
  combo: BeybladeCombo;
}

export default function ComboCard({ combo }: ComboCardProps) {
  return (
    <div className="card hover:shadow-xl transition-shadow duration-300 border border-gray-800">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-white mb-2">{combo.name}</h3>
          <div className="flex items-center text-xs text-gray-400">
            <Star className="h-4 w-4 text-blue-500 mr-1" />
            <span>{combo.wins} wins</span>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <div>
            <span className="text-xs text-gray-500">Blade</span>
            <p className="text-white">{combo.blade}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Ratchet</span>
            <p className="text-white">{combo.ratchet}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Bit</span>
            <p className="text-white">{combo.bit}</p>
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
        
        <div className="flex items-center text-xs text-gray-500 mt-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Created {new Date(combo.createdAt).toLocaleDateString()}</span>
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
  );
}
 