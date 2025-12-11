export interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isAuthor?: boolean;
  isLiked?: boolean;
  isOwner?: boolean;
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface CommentAPI {
  addComment: (content: string, parentId?: number) => Promise<Comment>;
  editComment: (id: number, content: string) => Promise<Comment>;
  deleteComment: (id: number) => Promise<void>;
  likeComment: (id: number) => Promise<void>;
  unlikeComment: (id: number) => Promise<void>;
  getComments: (postId: string) => Promise<Comment[]>;
}