import type { Article, ArticleAPI } from "@/lib/types/article";

export class ArticlesService implements ArticleAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  async getArticle(id: string): Promise<Article> {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${id}`);
      if (!response.ok) throw new Error("Failed to fetch article");
      return await response.json();
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  }

  async saveArticle(id: string, saved: boolean): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${id}/save`, {
        method: saved ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to save article");
    } catch (error) {
      console.error("Error saving article:", error);
      throw error;
    }
  }

  async shareArticle(id: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${id}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to share article");
      const data = await response.json();
      return data.shareUrl || window.location.href;
    } catch (error) {
      console.error("Error sharing article:", error);
      return window.location.href;
    }
  }

  async incrementViews(id: string): Promise<void> {
    try {
      await fetch(`${this.baseUrl}/articles/${id}/views`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  }
}

export const articlesService = new ArticlesService();