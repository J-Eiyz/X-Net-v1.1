import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, ChatRoom } from '../types';

interface ChatContextType {
  messages: Message[];
  rooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  isOnline: boolean;
  sendMessage: (text: string) => void;
  selectRoom: (roomId: string) => void;
  setOnlineStatus: (status: boolean) => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export function useChat() {
  return useContext(ChatContext);
}

function getRandomUsername(): string {
  const usernames = [
    'BeyMaster99',
    'StadiumKing',
    'SpinExpert',
    'BladeChampion',
    'DragonSlayer',
    'GalaxyFighter',
    'MetalFusion',
    'TopSpinner',
    'RipCord',
    'StrikeForce'
  ];
  return usernames[Math.floor(Math.random() * usernames.length)];
}

// Initial mock data for chat rooms
const initialRooms: ChatRoom[] = [
  {
    id: 'general',
    name: 'General Chat',
    type: 'public',
    lastMessage: 'Welcome to X-Net!',
    lastMessageTime: new Date().toISOString()
  },
  {
    id: 'tournaments',
    name: 'Tournament Hub',
    type: 'public',
    lastMessage: 'Regional qualifiers starting next week',
    lastMessageTime: new Date().toISOString()
  },
  {
    id: 'tips',
    name: 'Battle Tips & Tricks',
    type: 'public',
    lastMessage: 'The best attack combos for beginners',
    lastMessageTime: new Date().toISOString()
  },
  {
    id: 'ai',
    name: 'X-Net AI Assistant',
    type: 'ai',
    lastMessage: 'Ask me anything about Beyblade X!',
    lastMessageTime: new Date().toISOString()
  }
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<ChatRoom[]>(initialRooms);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(initialRooms[0]);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const storedMessages = localStorage.getItem('x-net-messages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error('Failed to parse stored messages', e);
      }
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('x-net-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Monitor online status
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

  // Simulate incoming messages in offline mode
  useEffect(() => {
    if (!isOnline && activeRoom) {
      const randomInterval = () => Math.floor(Math.random() * 15000) + 5000; // 5-20 seconds
      
      const interval = setInterval(() => {
        const randomResponses = [
          "Have you seen the latest Beyblade X stadium?",
          "I just got a perfect record at the tournament yesterday!",
          "My Galaxy Wheel combo is unbeatable now.",
          "What's everyone's favorite bit these days?",
          "Anyone want to battle online later?",
          "The championship is coming up soon, who's participating?",
          "I found a rare limited edition Beyblade at the store!",
          "Just launched my new combo and it's spinning for over 2 minutes!",
          "Who's going to the meetup this weekend?",
          "Check out my latest battle video on the feed!"
        ];
        
        const mockMessage: Message = {
          id: `mock-${Date.now()}`,
          text: randomResponses[Math.floor(Math.random() * randomResponses.length)],
          userId: `mock-user-${Math.floor(Math.random() * 100)}`,
          username: getRandomUsername(),
          timestamp: new Date().toISOString(),
          read: false
        };
        
        if (activeRoom.id !== 'ai') {
          setMessages(prev => [...prev, mockMessage]);
          
          // Update the room's last message
          setRooms(prev => prev.map(room => 
            room.id === activeRoom.id 
              ? { ...room, lastMessage: mockMessage.text, lastMessageTime: mockMessage.timestamp }
              : room
          ));
        }
      }, randomInterval());
      
      return () => clearInterval(interval);
    }
  }, [isOnline, activeRoom]);

  const sendMessage = (text: string) => {
    if (!activeRoom) return;
    
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      userId: 'current-user',
      username: 'You',
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Update the room's last message
    setRooms(prev => prev.map(room => 
      room.id === activeRoom.id 
        ? { ...room, lastMessage: text, lastMessageTime: newMessage.timestamp }
        : room
    ));
    
    // Simulate response in offline mode (except in AI room which has its own handler)
    if (!isOnline && activeRoom.id !== 'ai') {
      setTimeout(() => {
        const responses = [
          "That's awesome!",
          "Cool, thanks for sharing!",
          "I've been thinking the same thing!",
          "Interesting perspective!",
          "Let's battle sometime!",
          "Have you tried the new Beyblade X parts?",
          "What's your favorite Beyblade combo?",
          "I'll be at the tournament too!",
          "Did you see yesterday's championship match?",
          "My Beyblade has been spinning for over 3 minutes!"
        ];
        
        const responseMessage: Message = {
          id: `response-${Date.now()}`,
          text: responses[Math.floor(Math.random() * responses.length)],
          userId: `mock-user-${Math.floor(Math.random() * 100)}`,
          username: getRandomUsername(),
          timestamp: new Date().toISOString(),
          read: false
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const selectRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setActiveRoom(room);
    }
  };

  const setOnlineStatus = (status: boolean) => {
    setIsOnline(status);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      rooms,
      activeRoom,
      isOnline,
      sendMessage,
      selectRoom,
      setOnlineStatus
    }}>
      {children}
    </ChatContext.Provider>
  );
}
 