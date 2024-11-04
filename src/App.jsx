import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Import useAuth
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Landing from "./components/Landing";
import CreatePost from "./components/CreatePost";
import UpdatePost from "./components/UpdatePost";
import ViewDetailPost from "./components/ViewDetailPost";
import ViewDetailPrompt from "./components/ViewDetailPrompt";
import UserProfile from "./components/UserProfile";
import SignIn from "./components/SignIn";
import Team from "./components/Team";
import Footer from "./components/Footer";
import EditProfile from "./components/EditProfile";
import FAQ from "./components/FAQ";

// Move ProtectedRoute inside a separate component to use hooks properly
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/team" element={<Team />} />
            <Route path="/FAQ" element={<FAQ />} />

            {/* Protected routes */}
            <Route
              path="/landing"
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prompt/:promptId"
              element={
                <ProtectedRoute>
                  <ViewDetailPrompt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/prompt/:promptId/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
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
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />
            <Route
              path="/FAQ"
              element={
                <ProtectedRoute>
                  <FAQ />
                </ProtectedRoute>
              } */}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
