import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => void;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  continueAsGuest: () => void;
  logout: () => void;
  signup: (username: string, email: string, password: string) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('x-net-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('x-net-user');
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulating API call
    setTimeout(() => {
      if (username === 'demo' && password === 'password') {
        const newUser: User = {
          id: '1',
          username: 'demo',
          role: 'user',
          avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff'
        };
        setUser(newUser);
        localStorage.setItem('x-net-user', JSON.stringify(newUser));
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const loginWithGoogle = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulating OAuth login
    setTimeout(() => {
      const newUser: User = {
        id: '2',
        username: 'GoogleUser',
        email: 'google@example.com',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff'
      };
      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  const loginWithFacebook = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulating OAuth login
    setTimeout(() => {
      const newUser: User = {
        id: '3',
        username: 'FacebookUser',
        email: 'facebook@example.com',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=4267B2&color=fff'
      };
      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  const continueAsGuest = () => {
    setIsLoading(true);
    
    // Create a guest user
    setTimeout(() => {
      const guestId = `guest-${Date.now()}`;
      const newUser: User = {
        id: guestId,
        username: `Guest${Math.floor(Math.random() * 1000)}`,
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=Guest+User&background=333333&color=fff'
      };
      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('x-net-user');
    // Also clear other app data if needed
    localStorage.removeItem('x-net-chat-messages');
    localStorage.removeItem('x-net-ai-messages');
  };

  const signup = (username: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulating API call
    setTimeout(() => {
      // In a real app, you'd check if username/email already exists
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${username.replace(' ', '+')}&background=0D8ABC&color=fff`
      };
      setUser(newUser);
      localStorage.setItem('x-net-user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      login,
      loginWithGoogle,
      loginWithFacebook,
      continueAsGuest,
      logout,
      signup,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
}
 