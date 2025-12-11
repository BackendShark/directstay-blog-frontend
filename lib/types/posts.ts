export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  publishDate: string;
  likes: string;
  comments: string;
  views?: string;
  href: string;
  isBookmarked?: boolean;
  isLiked?: boolean;
  hasCollaboration?: boolean;
  category?: string;
  tags?: string[];
}

export interface PostsAPI {
  getTopPosts: (limit?: number) => Promise<Post[]>;
  getRecentPosts: (limit?: number) => Promise<Post[]>;
  getMostReadPosts: (limit?: number) => Promise<Post[]>;
  bookmarkPost: (postId: string, bookmarked: boolean) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  unlikePost: (postId: string) => Promise<void>;
}