import type { SidebarPost, SponsorshipRequest, SidebarAPI } from "@/lib/types/sidebar";

export class SidebarService implements SidebarAPI {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "/api";

  async getRelatedPosts(postId: string, limit = 4): Promise<SidebarPost[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${postId}/related?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch related posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching related posts:", error);
      return [];
    }
  }

  async submitSponsorshipRequest(request: SponsorshipRequest): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/sponsorship/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error("Failed to submit sponsorship request");
    } catch (error) {
      console.error("Error submitting sponsorship request:", error);
      throw error;
    }
  }
}

export const sidebarService = new SidebarService();