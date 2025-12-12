"use client";

import { useBlogEditor } from "./blog-editor-context";
import { PublishSettings } from "@/app/dashboard/blog-editor/page";

interface BlogActionsProps {
  onShowPublishSettings: () => void;
  onShowScheduleModal: () => void;
  onShowSuccessModal: (type: "draft" | "publish" | "schedule") => void;
  onSetPublishedBlogLink: (link: string) => void;
}

export function BlogActions({
  onShowPublishSettings,
  onShowScheduleModal,
  onShowSuccessModal,
  onSetPublishedBlogLink,
}: BlogActionsProps) {
  const { blogContent, setBlogContent, blogType, selectedMerchant } = useBlogEditor();

  const convertToMarkdown = (): string => {
    let markdown = "";

    if (blogContent.title) {
      markdown += `# ${blogContent.title}\n\n`;
    }

    blogContent.blocks.forEach((block) => {
      switch (block.type) {
        case "header":
          const level = "#".repeat(block.headerLevel || 2);
          markdown += `${level} ${block.content}\n\n`;
          break;
        case "body":
          markdown += `${block.content}\n\n`;
          break;
        case "single-image":
          if (block.content) {
            markdown += `![Image](${block.content})\n\n`;
          }
          break;
        case "image-grid":
          if (Array.isArray(block.content)) {
            block.content.forEach((img) => {
              if (img) {
                markdown += `![Image](${img})\n`;
              }
            });
            markdown += "\n";
          }
          break;
      }
    });

    return markdown.trim();
  };

  const saveToDraft = () => {
    const markdown = convertToMarkdown();
    console.log("[v0] ==================== DRAFT SAVED ====================");
    console.log("[v0] Blog Title:", blogContent.title || "Untitled");
    console.log("[v0] Content Blocks:", blogContent.blocks.length);
    console.log("[v0] \n--- MARKDOWN CONTENT ---\n");
    console.log(markdown);
    console.log("[v0] \n=======================================================");
    onShowSuccessModal("draft");
  };

  const publishBlog = () => {
    if (!blogContent.title.trim()) {
      alert("Please add a title to your blog post before publishing.");
      return;
    }
    onShowPublishSettings();
  };

  const handleFinalPublish = (settings: PublishSettings) => {
    const updatedContent = {
      ...blogContent,
      publishSettings: settings,
      blogType: blogType,
      selectedMerchant: selectedMerchant,
    };
    setBlogContent(updatedContent);

    const markdown = convertToMarkdown();
    console.log("[v0] ==================== BLOG PUBLISHED ====================");
    console.log("[v0] Blog Title:", blogContent.title || "Untitled");
    console.log("[v0] Published At:", new Date().toISOString());
    console.log("[v0] Content Blocks:", blogContent.blocks.length);
    console.log("[v0] \n--- PUBLISH SETTINGS ---");
    console.log("Thumbnail:", settings.thumbnail ? "Set" : "Not set");
    console.log("Description:", settings.description);
    console.log("Tags:", settings.tags.join(", "));
    console.log("Adult Content:", settings.isAdultContent);
    console.log("Comments Disabled:", settings.commentsDisabled);
    console.log("[v0] \n--- MARKDOWN CONTENT ---\n");
    console.log(markdown);
    console.log("[v0] \n===========================================================");
    
    const generatedLink = `https://directstayblog/${blogContent.title
      .toLowerCase()
      .replace(/\s+/g, "")}/${Date.now()}`;
    onSetPublishedBlogLink(generatedLink);
    onShowSuccessModal("publish");
  };

  const handleSchedule = (date: string, time: string) => {
    const markdown = convertToMarkdown();
    console.log("[v0] ==================== BLOG SCHEDULED ====================");
    console.log("[v0] Blog Title:", blogContent.title || "Untitled");
    console.log("[v0] Scheduled For:", `${date} at ${time}`);
    console.log("[v0] Content Blocks:", blogContent.blocks.length);
    console.log("[v0] \n--- MARKDOWN CONTENT ---\n");
    console.log(markdown);
    console.log("[v0] \n=======================================================");
    onShowSuccessModal("schedule");
  };

  return {
    saveToDraft,
    publishBlog,
    handleFinalPublish,
    handleSchedule,
  };
}