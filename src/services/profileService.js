const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000";

console.log('BASE_URL:', BASE_URL);

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  };
  
  export const getProfile = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/profile/${userId}`, {
        headers: getHeaders(),
      });
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      return json;
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  export const updateUsername = async (userId, newUsername) => {
    try {
      const res = await fetch(`${BASE_URL}/profile/${userId}/username`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ newUsername }),
      });
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }
      return json;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  export const updateUserProfile = async (userId, updates) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${BASE_URL}/users/${userId}`;
      
      console.log('Making request to:', url);
      console.log('With updates:', updates);
      
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
  
      console.log('Response status:', response.status);
      
      // Try to get response text first
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Then parse it as JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid server response');
      }
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
  
      return data;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };