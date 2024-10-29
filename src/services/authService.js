import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_EXPRESS_BACKEND_URL || "http://localhost:3000";

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);

    if (response.data.error) {
      throw new Error(response.data.error || "Signup failed");
    }

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signin = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signin`, credentials);

    console.log("Attempting signin with:", credentials); // Debug log

    if (response.data.error) {
      throw new Error(response.data.error || "Signin failed");
    }

    console.log("Response status:", response.status); // Debug log

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Parse and return the user data from the token
      const user = JSON.parse(atob(response.data.token.split(".")[1]));
      return { user, token: response.data.token };
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

export const signinWithGoogle = async (googleUser) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/google/callback`, {
      token: googleUser.token,
    });

    if (response.data.error) {
      throw new Error(response.data.error || "Google Sign-In failed");
    }

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      const user = JSON.parse(atob(response.data.token.split(".")[1]));
      return { user, token: response.data.token };
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Google Sign-In error:", error);
    throw error;
  }
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch (error) {
    console.error("Error parsing token:", error);
    localStorage.removeItem("token");
    return null;
  }
};

export const signout = () => {
  localStorage.removeItem("token");
};
