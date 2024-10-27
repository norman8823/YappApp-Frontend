import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Landing from './components/Landing';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import ViewDetailPost from './components/ViewDetailPost';
import ViewDetailTopic from './components/ViewDetailTopic';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="app-container">
        {/* NavBar only shows on authenticated routes */}
        <Routes>
          {/* HomePage route without NavBar */}
          <Route path="/" element={<HomePage />} />
          {/* All other routes with NavBar */}
          <Route
            path="/landing"
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/topic/:topicId" 
              element={
                <ProtectedRoute>
                  <ViewDetailTopic />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/post/create" 
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/post/:postId" 
              element={
                <ProtectedRoute>
                  <ViewDetailPost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/post/:postId/edit" 
              element={
                <ProtectedRoute>
                  <UpdatePost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  return children;
};

export default App;