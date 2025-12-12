"use client";

import { cn } from "@/lib/utils";
import { ContentBlock } from "@/app/dashboard/blog-editor/page";
import { useBlogEditor } from "../blog-editor-context";
import { FormattingToolbar } from "./formatting-toolbar";

interface BodyBlockProps {
  block: ContentBlock;
}

export function BodyBlock({ block }: BodyBlockProps) {
  const { selectedBlockId, updateBlock } = useBlogEditor();

  const getBodyTextSize = (size?: string) => {
    const sizes = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    };
    return sizes[size as keyof typeof sizes] || sizes.medium;
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const textarea = e.currentTarget;
      const cursorPos = textarea.selectionStart;
      const content = textarea.value;
      const lineStart = content.lastIndexOf("\n", cursorPos - 1) + 1;
      const currentLine = content.substring(lineStart, cursorPos);

      // Check for bullet list
      const bulletMatch = currentLine.match(/^•\s/);
      if (bulletMatch) {
        e.preventDefault();
        const newContent =
          content.substring(0, cursorPos) + "\n• " + content.substring(cursorPos);
        updateBlock(block.id, { content: newContent });
        setTimeout(() => {
          textarea.focus();
          const newPos = cursorPos + 3;
          textarea.setSelectionRange(newPos, newPos);
        }, 0);
        return;
      }

      // Check for numbered list
      const numberMatch = currentLine.match(/^(\d+)\.\s/);
      if (numberMatch) {
        e.preventDefault();
        const currentNum = Number.parseInt(numberMatch[1]);
        const nextNum = currentNum + 1;
        const newContent =
          content.substring(0, cursorPos) +
          `\n${nextNum}. ` +
          content.substring(cursorPos);
        updateBlock(block.id, { content: newContent });
        setTimeout(() => {
          textarea.focus();
          const newPos = cursorPos + `\n${nextNum}. `.length;
          textarea.setSelectionRange(newPos, newPos);
        }, 0);
        return;
      }

      // Check for quote
      const quoteMatch = currentLine.match(/^>\s/);
      if (quoteMatch) {
        e.preventDefault();
        const newContent =
          content.substring(0, cursorPos) + "\n> " + content.substring(cursorPos);
        updateBlock(block.id, { content: newContent });
        setTimeout(() => {
          textarea.focus();
          const newPos = cursorPos + 3;
          textarea.setSelectionRange(newPos, newPos);
        }, 0);
        return;
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <select
          value={block.bodySize || "medium"}
          onChange={(e) =>
            updateBlock(block.id, {
              bodySize: e.target.value,
            })
          }
          className="px-2 py-1 text-xs border border-border rounded bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <textarea
        data-block-id={block.id}
        value={block.content as string}
        onChange={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
          updateBlock(block.id, {
            content: e.target.value,
          });
        }}
        onBlur={(e) => {
          if (!e.target.value.trim()) {
            e.target.style.height = "auto";
          }
        }}
        onKeyDown={handleTextareaKeyDown}
        placeholder="Start typing your content..."
        className={cn(
          "w-full text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none focus:ring-0 resize-none overflow-hidden min-h-[60px]",
          getBodyTextSize(block.bodySize)
        )}
        rows={3}
      />
      {selectedBlockId === block.id && (
        <FormattingToolbar blockId={block.id} />
      )}
    </div>
  );
}