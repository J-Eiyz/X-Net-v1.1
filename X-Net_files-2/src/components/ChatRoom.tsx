import  { useState, useEffect, useRef } from 'react';
import { User, Bot, ArrowRight } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import NetworkStatus from './NetworkStatus';

export default function ChatRoom() {
  const { messages, activeRoom, sendMessage, isOnline } = useChat();
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-900 p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center">
              <span className="text-blue-500 font-bold">
                {activeRoom?.name.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-bold text-white">{activeRoom?.name}</h2>
            </div>
          </div>
          <NetworkStatus />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
        {activeRoom?.type === 'ai' ? (
          <div className="flex justify-center">
            <div className="max-w-md text-center p-4 bg-gray-800 rounded-lg">
              <Bot className="h-6 w-6 mx-auto text-blue-500 mb-2" />
              <p className="text-gray-300">
                Please use the AI Assistant page for dedicated AI chat.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                The AI Assistant offers more features and context-aware responses.
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center">
            <div className="max-w-md text-center p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-300">
                No messages yet. Be the first to say hello!
              </p>
              {!isOnline && (
                <p className="text-yellow-500 text-sm mt-2">
                  You're in offline mode. Messages will be simulated.
                </p>
              )}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.userId === 'current-user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                  message.userId === 'current-user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  {message.userId === 'current-user' ? (
                    <User className="h-4 w-4 mr-1 text-white" />
                  ) : (
                    <User className="h-4 w-4 mr-1 text-blue-500" />
                  )}
                  <span className="font-bold text-xs">
                    {message.userId === 'current-user' ? user?.username || 'You' : message.username}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div className="text-xs opacity-70 text-right mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 disabled:opacity-50"
            disabled={!inputValue.trim()}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
 