import  { useState } from 'react';
import { useChat } from '../context/ChatContext';
import Navbar from '../components/Navbar';
import ChatRoom from '../components/ChatRoom';
import OnlineOfflineToggle from '../components/OnlineOfflineToggle';

export default function ChatPage() {
  const { rooms, activeRoom, selectRoom, isOnline, setOnlineStatus } = useChat();

  // Sort rooms: AI room at the bottom, rest are sorted alphabetically
  const sortedRooms = [...rooms].sort((a, b) => {
    if (a.type === 'ai') return 1;
    if (b.type === 'ai') return -1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 hidden md:block">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-bold text-white">Chat Rooms</h2>
            <div className="mt-2">
              <OnlineOfflineToggle 
                isOnline={isOnline} 
                onChange={setOnlineStatus} 
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            <div className="p-2 space-y-1">
              {sortedRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => selectRoom(room.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeRoom?.id === room.id
                      ? 'bg-blue-900/30 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="font-medium">{room.name}</div>
                  {room.lastMessage && (
                    <div className="text-xs truncate text-gray-500 mt-1">
                      {room.lastMessage}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile room selector */}
        <div className="md:hidden bg-gray-900 border-b border-gray-800 fixed top-16 left-0 right-0 z-10">
          <div className="p-4 flex justify-between items-center">
            <select 
              value={activeRoom?.id || ''}
              onChange={(e) => selectRoom(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded-md p-2 flex-1 mr-2"
            >
              {sortedRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            
            <OnlineOfflineToggle 
              isOnline={isOnline} 
              onChange={setOnlineStatus} 
            />
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 md:pt-0 pt-16">
          {activeRoom ? (
            <ChatRoom />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Select a chat room to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 