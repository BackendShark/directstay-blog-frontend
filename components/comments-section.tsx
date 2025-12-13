"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  ThumbsUp,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import type { Comment } from "@/lib/types/comments";
import UnderlinedText from "./underline-text";

export interface CommentsProps {
  comments: Comment[];
  currentUser?: {
    name: string;
    avatar?: string;
  };
  onAddComment?: (content: string, parentId?: number) => Promise<void>;
  onEditComment?: (id: number, content: string) => Promise<void>;
  onDeleteComment?: (id: number) => Promise<void>;
  onLikeComment?: (id: number) => Promise<void>;
  onUnlikeComment?: (id: number) => Promise<void>;
}

export function CommentsSection({
  comments: initialComments,
  currentUser = { name: "Gabriella Montez", avatar: "/placeholder.svg" },
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  onUnlikeComment,
}: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const comment: Comment = {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        replies: [],
        isOwner: true,
      };

      // Update local state first
      setComments((prev) => [comment, ...prev]);

      if (onAddComment) {
        await onAddComment(newComment);
      }

      toast({ title: "Comment added successfully" });
      setNewComment("");
    } catch (error) {
      toast({ title: "Failed to add comment", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (parentId: number) => {
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const reply: Comment = {
        id: Date.now(),
        author: currentUser.name,
        avatar: currentUser.avatar,
        content: replyContent,
        timestamp: "Just now",
        likes: 0,
        replies: [],
        isOwner: true,
      };

      // Update local state first
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );

      if (onAddComment) {
        await onAddComment(replyContent, parentId);
      }

      toast({ title: "Reply added successfully" });
      setReplyContent("");
      setReplyingTo(null);
    } catch (error) {
      toast({ title: "Failed to add reply", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (id: number) => {
    if (!editContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const updateComment = (comments: Comment[]): Comment[] =>
        comments.map((comment) =>
          comment.id === id
            ? { ...comment, content: editContent }
            : { ...comment, replies: updateComment(comment.replies) }
        );

      // Update local state first
      setComments((prev) => updateComment(prev));

      if (onEditComment) {
        await onEditComment(id, editContent);
      }

      toast({ title: "Comment updated successfully" });
      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      toast({ title: "Failed to update comment", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const removeComment = (comments: Comment[]): Comment[] =>
        comments
          .filter((comment) => comment.id !== id)
          .map((comment) => ({
            ...comment,
            replies: removeComment(comment.replies),
          }));

      // Update local state first
      setComments((prev) => removeComment(prev));

      if (onDeleteComment) {
        await onDeleteComment(id);
      }

      toast({ title: "Comment deleted successfully" });
    } catch (error) {
      toast({ title: "Failed to delete comment", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: number, isLiked: boolean) => {
    try {
      // Optimistic update
      const updateLike = (comments: Comment[]): Comment[] =>
        comments.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                likes: isLiked ? comment.likes - 1 : comment.likes + 1,
                isLiked: !isLiked,
              }
            : { ...comment, replies: updateLike(comment.replies) }
        );

      setComments((prev) => updateLike(prev));

      if (isLiked && onUnlikeComment) {
        await onUnlikeComment(id);
      } else if (!isLiked && onLikeComment) {
        await onLikeComment(id);
      }
    } catch (error) {
      // Revert on error
      const revertLike = (comments: Comment[]): Comment[] =>
        comments.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                likes: isLiked ? comment.likes + 1 : comment.likes - 1,
                isLiked: isLiked,
              }
            : { ...comment, replies: revertLike(comment.replies) }
        );

      setComments((prev) => revertLike(prev));
      toast({ title: "Failed to update like", variant: "destructive" });
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
  };

  const cancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`flex gap-3 ${isReply ? "ml-12 mt-4" : ""}`}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
        <AvatarFallback>
          {comment.author.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold">{comment.author}</span>
          {comment.isAuthor && (
            <Badge variant="secondary" className="h-5 text-xs">
              Author
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">
            {comment.timestamp}
          </span>
          {comment.isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => startEdit(comment)}>
                  <Edit className="h-3 w-3 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(comment.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {editingComment === comment.id ? (
          <div className="space-y-2">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleEdit(comment.id)}
                disabled={isSubmitting || !editContent.trim()}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={cancelEdit}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              {comment.content}
            </p>
            <div className="flex items-center gap-4 text-sm">
              {!isReply && (
                <button
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                  }
                >
                  Reply
                </button>
              )}
              <button
                className={`flex items-center gap-1 hover:text-foreground ${
                  comment.isLiked ? "text-blue-600" : "text-muted-foreground"
                }`}
                onClick={() => handleLike(comment.id, comment.isLiked || false)}
                disabled={isSubmitting}
              >
                <ThumbsUp
                  className={`h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`}
                />
                {comment.likes > 0 && comment.likes}
              </button>
              {comment.replies.length > 0 && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle className="h-3 w-3" />
                  {comment.replies.length}
                </span>
              )}
            </div>
          </>
        )}

        {replyingTo === comment.id && (
          <div className="mt-4 space-y-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => handleReply(comment.id)}
                disabled={isSubmitting || !replyContent.trim()}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setReplyingTo(null)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {comment.replies.map((reply) => renderComment(reply, true))}
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="mb-4">
        <UnderlinedText text="Comments" commentCount={comments.length || 0} />
      </div>

      {/* Comment Input */}
      <div className="mb-8">
        <div className="flex gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {currentUser.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <span className="font-semibold">{currentUser.name}</span>
          </div>
        </div>
        <Textarea
          placeholder="Share your thoughts"
          className="mb-2 min-h-[100px]"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleAddComment}
            disabled={isSubmitting || !newComment.trim()}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            {isSubmitting ? "Posting..." : "Comment"}
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
}
