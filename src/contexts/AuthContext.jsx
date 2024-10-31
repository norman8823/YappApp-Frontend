import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  const signin = async (credentials) => {
    try {
      const response = await authService.signin(credentials);
      const user = response.user;
      setUser(user);
      return user;
    } catch (error) {
      console.error("Signin error:", error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        const user = authService.getUser(); // Parse the token to get user info
        setUser(user); // Set the user in context
        return response;
      }
      throw new Error("Signup failed");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const googleSignin = async (token) => {
    try {
      const response = await authService.googleSignin(token); // Adjust service call as necessary
      const user = response.user; // Assuming response contains user data
      setUser(user);
      return user;
    } catch (error) {
      console.error("Google Signin error:", error);
      throw error;
    }
  };

  const signout = () => {
    authService.signout();
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updatedUserData
    }));
  };

  const value = {
    user,
    signin,
    signup,
    googleSignin,
    signout,
    updateUser,
    isLoading,
    isAuthenticated: !!user,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
