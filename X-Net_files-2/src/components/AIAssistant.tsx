import  { useState, useEffect, useRef } from 'react';
import { User, Bot, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { aiService } from '../services/aiService';
import { AIMessage } from '../types';

export default function AIAssistant() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial messages or welcome message
  useEffect(() => {
    const initialMessages = aiService.getInitialMessages();
    setMessages(initialMessages);
  }, []);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      aiService.saveMessages(messages);
    }
  }, [messages]);

  // Check for online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: AIMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      timestamp: new Date().toISOString(),
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get AI response, passing the current online status
      const aiResponse = await aiService.sendMessage(inputValue, isOnline);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add fallback response if there's an error
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        text: "Sorry, I couldn't process that request. Please try again later or check your network connection.",
        timestamp: new Date().toISOString(),
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="bg-gray-900 p-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-bold">X-Net AI Assistant</h2>
            <div className="flex items-center text-xs">
              <span className={`flex items-center ${isOnline ? 'text-green-400' : 'text-yellow-500'}`}>
                <span className={`w-2 h-2 ${isOnline ? 'bg-green-400' : 'bg-yellow-500'} rounded-full mr-1`}></span>
                {isOnline ? 'Online' : 'Offline Mode'}
              </span>
              {!isOnline && (
                <span className="ml-2 text-gray-400">
                  (Limited responses available)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                message.isUser 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-800 text-gray-200 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.isUser ? (
                  <User className="h-4 w-4 mr-1 text-white" />
                ) : (
                  <Bot className="h-4 w-4 mr-1 text-blue-500" />
                )}
                <span className="font-bold text-xs">
                  {message.isUser ? user?.username || 'You' : 'X-Net AI'}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
              <div className="text-xs opacity-70 text-right mt-1">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md rounded-lg px-4 py-2 bg-gray-800 text-gray-200 rounded-bl-none">
              <div className="flex items-center mb-1">
                <Bot className="h-4 w-4 mr-1 text-blue-500" />
                <span className="font-bold text-xs">X-Net AI</span>
              </div>
              <div className="flex space-x-1 items-center p-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="flex items-center mb-2">
          <Zap className="h-4 w-4 text-yellow-500 mr-1" />
          <span className="text-xs text-gray-400">
            Ask about Beyblade combos, strategy tips, or tournament advice
          </span>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message to X-Net AI..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading || !inputValue.trim()}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
 