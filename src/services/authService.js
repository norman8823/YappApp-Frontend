const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://localhost:3000';

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const signin = async (credentials) => {
  try {
    console.log('Attempting signin with:', credentials); // Debug log

    const response = await fetch(`${BASE_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    console.log('Response status:', response.status); // Debug log

    const data = await response.json();
    console.log('Response data:', data); // Debug log

    if (!response.ok) {
      throw new Error(data.error || 'Signin failed');
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
      // Parse and return the user data from the token
      const user = JSON.parse(atob(data.token.split('.')[1]));
      return { user, token: data.token };
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.error('Signin error:', error);
    throw error;
  }
};

export const signout = () => {
  localStorage.removeItem('token');
};

export const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    localStorage.removeItem('token');
    return null;
  }
};