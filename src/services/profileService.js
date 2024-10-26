const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  };
  
  export const getProfile = async (userId) => {
    try {
      const res = await fetch(`${BACKEND_URL}/profile/${userId}`, {
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
      const res = await fetch(`${BACKEND_URL}/profile/${userId}/username`, {
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