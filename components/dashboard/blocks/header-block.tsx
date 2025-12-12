"use client";

import { cn } from "@/lib/utils";
import { ContentBlock } from "@/app/dashboard/blog-editor/page";
import { useBlogEditor } from "../blog-editor-context";
import { FormattingToolbar } from "./formatting-toolbar";

interface HeaderBlockProps {
  block: ContentBlock;
}

export function HeaderBlock({ block }: HeaderBlockProps) {
  const { selectedBlockId, updateBlock } = useBlogEditor();

  const getHeaderStyles = (level: number) => {
    const styles = {
      1: "text-5xl",
      2: "text-4xl",
      3: "text-3xl",
      4: "text-2xl",
      5: "text-xl",
      6: "text-lg",
    };
    return styles[level as keyof typeof styles] || styles[2];
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const textarea = e.currentTarget;
      const cursorPos = textarea.selectionStart;
      const content = textarea.value;
      const lineStart = content.lastIndexOf("\n", cursorPos - 1) + 1;
      const currentLine = content.substring(lineStart, cursorPos);

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
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <select
          value={block.headerLevel || 2}
          onChange={(e) =>
            updateBlock(block.id, {
              headerLevel: Number(e.target.value),
            })
          }
          className="px-2 py-1 text-xs border border-border rounded bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          <option value={1}>H1</option>
          <option value={2}>H2</option>
          <option value={3}>H3</option>
          <option value={4}>H4</option>
          <option value={5}>H5</option>
          <option value={6}>H6</option>
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
        placeholder="Enter header text..."
        className={cn(
          "w-full font-bold text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none focus:ring-0 resize-none overflow-hidden",
          getHeaderStyles(block.headerLevel || 2)
        )}
        rows={1}
      />
      {selectedBlockId === block.id && (
        <FormattingToolbar blockId={block.id} isHeader />
      )}
    </div>
  );
}