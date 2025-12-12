"use client";

import { Bold, Italic, Underline, Strikethrough, Link, Code, List, ListOrdered, Quote } from "lucide-react";
import { useBlogEditor } from "../blog-editor-context";

interface FormattingToolbarProps {
  blockId: string;
  isHeader?: boolean;
}

export function FormattingToolbar({ blockId, isHeader = false }: FormattingToolbarProps) {
  const { blogContent, updateBlock } = useBlogEditor();

  const applyFormatting = (format: string) => {
    const block = blogContent.blocks.find((b) => b.id === blockId);
    if (!block || typeof block.content !== "string") return;

    const textarea = document.querySelector(
      `[data-block-id="${blockId}"]`
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = block.content.substring(start, end);

    if (!selectedText && format !== "ul" && format !== "ol") return;

    let formattedText = "";
    let newContent = "";

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        newContent =
          block.content.substring(0, start) +
          formattedText +
          block.content.substring(end);
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        newContent =
          block.content.substring(0, start) +
          formattedText +
          block.content.substring(end);
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        newContent =
          block.content.substring(0, start) +
          formattedText +
          block.content.substring(end);
        break;
      case "strikethrough":
        formattedText = `~~${selectedText}~~`;
        newContent =
          block.content.substring(0, start) +
          formattedText +
          block.content.substring(end);
        break;
      case "code":
        formattedText = `\`${selectedText}\``;
        newContent =
          block.content.substring(0, start) +
          formattedText +
          block.content.substring(end);
        break;
      case "link":
        const url = prompt("Enter URL:");
        if (url) {
          formattedText = `[${selectedText}](${url})`;
          newContent =
            block.content.substring(0, start) +
            formattedText +
            block.content.substring(end);
        } else {
          return;
        }
        break;
      case "ul":
        const ulLines = selectedText
          ? selectedText
              .split("\n")
              .map((line) => `• ${line}`)
              .join("\n")
          : "• ";
        newContent =
          block.content.substring(0, start) +
          ulLines +
          block.content.substring(end);
        break;
      case "ol":
        const olLines = selectedText
          ? selectedText
              .split("\n")
              .map((line, i) => `${i + 1}. ${line}`)
              .join("\n")
          : "1. ";
        newContent =
          block.content.substring(0, start) +
          olLines +
          block.content.substring(end);
        break;
      case "quote":
        const quoteLines = selectedText
          ? selectedText
              .split("\n")
              .map((line) => `> ${line}`)
              .join("\n")
          : "> ";
        newContent =
          block.content.substring(0, start) +
          quoteLines +
          block.content.substring(end);
        break;
      default:
        return;
    }

    updateBlock(blockId, { content: newContent });

    setTimeout(() => {
      textarea.focus();
      const newPos = start + formattedText.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div className="flex items-center gap-1 p-2 bg-[#5B6FFF] rounded-lg w-fit flex-wrap">
      <button
        onClick={() => applyFormatting("bold")}
        className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormatting("italic")}
        className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormatting("underline")}
        className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormatting("strikethrough")}
        className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </button>
      <button
        onClick={() => applyFormatting("link")}
        className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
        title="Link"
      >
        <Link className="w-4 h-4" />
      </button>
      
      {!isHeader && (
        <>
          <div className="w-px h-6 bg-white/30" />
          <button
            onClick={() => applyFormatting("code")}
            className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-white/30" />
          <button
            onClick={() => applyFormatting("ul")}
            className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormatting("ol")}
            className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => applyFormatting("quote")}
            className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
}