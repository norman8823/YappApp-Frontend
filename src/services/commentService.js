//commentService.js
const BASE_URL =
  import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3000";

export const createComment = async (commentData) => {
  try {
    console.log("Sending comment data:", commentData); // Debug log

    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token");

    if (!commentData.owner || !commentData.postId || !commentData.text) {
        throw new Error("Missing required fields");
      }

    const response = await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        owner: commentData.owner,
        postId: commentData.postId,
        text: commentData.text,
      }),
    });

    console.log("Response status:", response.status); // Debug log

    const data = await response.json();
    console.log("Response data:", data); // Debug log

    if (!response.ok) {
      throw new Error(data.error || "Failed to create comment");
    }

    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      throw error;
    }
  };
