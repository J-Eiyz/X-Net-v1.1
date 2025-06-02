import  { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import CombosPage from './pages/CombosPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';
import AIAssistantPage from './pages/AIAssistantPage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/community" element={<CommunityPage />} />
      
      <Route 
        path="/chat" 
        element={
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        } 
      />
      
      <Route 
        path="/combos" 
        element={
          <RequireAuth>
            <CombosPage />
          </RequireAuth>
        } 
      />
      
      <Route 
        path="/profile" 
        element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        } 
      />
      
      <Route 
        path="/upload" 
        element={
          <RequireAuth>
            <UploadPage />
          </RequireAuth>
        } 
      />
      
      <Route 
        path="/ai-assistant" 
        element={
          <RequireAuth>
            <AIAssistantPage />
          </RequireAuth>
        } 
      />
    </Routes>
  );
}

export default App;
 