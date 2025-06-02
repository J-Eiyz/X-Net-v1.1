import  { Wifi, WifiOff } from 'lucide-react';
import { OnlineOfflineToggleProps } from '../types';

export default function OnlineOfflineToggle({ isOnline, onChange }: OnlineOfflineToggleProps) {
  return (
    <button 
      onClick={() => onChange(!isOnline)}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isOnline 
          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' 
          : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/50'
      }`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-4 w-4 mr-2" />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-4 w-4 mr-2" />
          <span>Offline Mode</span>
        </>
      )}
    </button>
  );
}
 