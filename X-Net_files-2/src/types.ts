//  Types for authentication
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role: 'user' | 'admin';
}

// Types for Beyblade combos
export interface BeybladeCombo {
  id: string;
  name: string;
  blade: string;
  ratchet: string;
  bit: string;
  tags: string[];
  wins: number;
  losses: number;
  userId: string;
  createdAt: string;
}

// Types for feed posts
export interface Post {
  id: string;
  type: 'text' | 'image' | 'video' | 'combo';
  content: string;
  mediaUrl?: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  hasLiked?: boolean;
  combo?: BeybladeCombo;
}

// Types for chat
export interface Message {
  id: string;
  text: string;
  userId: string;
  username: string;
  timestamp: string;
  read: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'public' | 'private' | 'ai';
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

// Types for AI assistant
export interface AIMessage {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}

// Types for online/offline toggle
export interface OnlineOfflineToggleProps {
  isOnline: boolean;
  onChange: (isOnline: boolean) => void;
}

// Types for network status
export interface NetworkStatusProps {
  className?: string;
}
 