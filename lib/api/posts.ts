import type { Post, PostsAPI } from "@/lib/types/posts";

export class PostsService implements PostsAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  async getTopPosts(limit = 10): Promise<Post[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/top?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch top posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching top posts:", error);
      return [];
    }
  }

  async getRecentPosts(limit = 10): Promise<Post[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/recent?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch recent posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching recent posts:", error);
      return [];
    }
  }

  async getMostReadPosts(limit = 10): Promise<Post[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/most-read?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch most read posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching most read posts:", error);
      return [];
    }
  }

  async bookmarkPost(postId: string, bookmarked: boolean): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${postId}/bookmark`, {
        method: bookmarked ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update bookmark");
    } catch (error) {
      console.error("Error updating bookmark:", error);
      throw error;
    }
  }

  async likePost(postId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to like post");
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  }

  async unlikePost(postId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${postId}/like`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to unlike post");
    } catch (error) {
      console.error("Error unliking post:", error);
      throw error;
    }
  }
}

export const postsService = new PostsService();