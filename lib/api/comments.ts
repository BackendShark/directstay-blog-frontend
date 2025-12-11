import type { Comment, CommentAPI } from "@/lib/types/comments";

// Mock API service - replace with actual backend calls
export class CommentsService implements CommentAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${postId}/comments`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return await response.json();
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  }

  async addComment(content: string, parentId?: number): Promise<Comment> {
    try {
      const response = await fetch(`${this.baseUrl}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, parentId }),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      return await response.json();
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  }

  async editComment(id: number, content: string): Promise<Comment> {
    try {
      const response = await fetch(`${this.baseUrl}/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error("Failed to edit comment");
      return await response.json();
    } catch (error) {
      console.error("Error editing comment:", error);
      throw error;
    }
  }

  async deleteComment(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/comments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete comment");
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  }

  async likeComment(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/comments/${id}/like`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to like comment");
    } catch (error) {
      console.error("Error liking comment:", error);
      throw error;
    }
  }

  async unlikeComment(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/comments/${id}/like`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to unlike comment");
    } catch (error) {
      console.error("Error unliking comment:", error);
      throw error;
    }
  }
}

export const commentsService = new CommentsService();