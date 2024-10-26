import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import NavBar from './NavBar';
import HomePage from './HomePage';
import Landing from './Landing';
import ViewDetailTopic from './ViewDetailTopic';
import ViewDetailPost from './ViewDetailPost';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
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
              path="/post/:postId" 
              element={
                <ProtectedRoute>
                  <ViewDetailPost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-post" 
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/update-post/:postId" 
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
            <Route 
              path="/edit-profile" 
              element={
                <ProtectedRoute>
                  <EditProfile />
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
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default App;