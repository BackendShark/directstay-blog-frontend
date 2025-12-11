export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: ArticleAuthor;
  category?: string;
  tags?: string[];
  publishDate: string;
  updatedDate?: string;
  readTime: string;
  views: number;
  commentsCount: number;
  likesCount?: number;
  isSaved?: boolean;
  isLiked?: boolean;
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
}

export interface ArticleAuthor {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  isVerified?: boolean;
}

export interface ArticleStats {
  publishDate: string;
  readTime: string;
  views: string;
  comments: string;
}

export interface ArticleAPI {
  getArticle: (id: string) => Promise<Article>;
  saveArticle: (id: string, saved: boolean) => Promise<void>;
  shareArticle: (id: string) => Promise<string>;
  incrementViews: (id: string) => Promise<void>;
}