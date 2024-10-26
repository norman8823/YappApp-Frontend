const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/posts`;

export const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const create = async (postFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const show = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const update = async (postId, postData) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (postId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
