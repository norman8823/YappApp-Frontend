const BASE_URL =
  import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000";

export const getPostsByPrompt = async (promptId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/prompt/${promptId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const token = localStorage.getItem("token"); 

    if (!token) {
      throw new Error("No authentication token available");
    }
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    console.log("Sending post data:", postData); // Debug log

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token");

    const formattedData = {
      owner: postData.owner,
      prompt: postData.prompt, // Make sure this is a valid MongoDB ObjectId
      text: postData.text,
    };

    console.log("Formatted data:", formattedData); // Debug log

    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        owner: postData.owner,
        prompt: postData.prompt,
        text: postData.text,
      }),
    });

    console.log("Response status:", response.status); // Debug log

    const data = await response.json();
    console.log("Response data:", data); // Debug log

    if (!response.ok) {
      throw new Error(data.error || "Failed to create post");
    }

    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    return response.status === 204 ? null : response.json();
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
// PUT "/posts/:postId/vote", add header for token, pass voteType in body of request
export const likePost = async (postId, voteType) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(voteType),
    });
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return response.json();
  } catch (error) {
    console.error("Error liking/disliking post:", error);
    throw error;
  }
};

export const getVote = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}/vote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error viewing vote:", error);
    throw error;
  }
};
