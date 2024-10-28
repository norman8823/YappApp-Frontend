const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL || 'http://localhost:3000';

export const getPostsByPrompt = async (promptId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/prompt/${promptId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (postId) => {  // renamed from 'show' to match backend
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error('Failed to update post');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

    return response.status === 204 ? null : response.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

