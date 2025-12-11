export interface SidebarPost {
  id: string;
  title: string;
  author: string;
  views: string;
  image?: string;
  href: string;
}

export interface SponsorshipRequest {
  businessName: string;
  contactEmail: string;
  description?: string;
  budget?: string;
}

export interface SidebarAPI {
  getRelatedPosts: (postId: string, limit?: number) => Promise<SidebarPost[]>;
  submitSponsorshipRequest: (request: SponsorshipRequest) => Promise<void>;
}