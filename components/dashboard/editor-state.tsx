"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Type,
  ImageIcon,
  Grid3x3,
  Building2,
  Link2,
  Settings,
  Bell,
  GripVertical,
  Upload,
  Bold,
  Italic,
  Underline,
  Link,
  Trash2,
  X,
  Plus,
  List,
  ListOrdered,
  Code,
  Quote,
  Strikethrough,
  Check,
  MoreVertical,
  MapPin,
  Mic,
  Send,
  TrendingUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ScheduleModal } from "./schedule-modal"; // Import new modal components
import { SuccessModal } from "./success-modal"; // Import new modal components
import {
  BlogContent,
  ContentBlock,
  Merchant,
  PropertyListing,
  PublishSettings,
} from "@/app/dashboard/blog-editor/page";
import { PropertyListingModal } from "./property-listing-modal";
import { ContentSettingsModal } from "./content-settings-modal";
import { PublishSettingsModal } from "./publish-settings-modal";

interface EditorStateProps {
  onBack: () => void;
  blogContent: BlogContent;
  setBlogContent: (content: BlogContent) => void;
}

export function EditorState({
  onBack,
  blogContent,
  setBlogContent,
}: EditorStateProps) {
  const [blogType, setBlogType] = useState<"personal" | "sponsored">(
    blogContent.blogType || "personal"
  );
  const [showMerchantSearch, setShowMerchantSearch] = useState(false);
  const [merchantSearchQuery, setMerchantSearchQuery] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    blogContent.selectedMerchant || null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  const [selectedBlog, setSelectedBlog] = useState("Personal Blog");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [resizingBlock, setResizingBlock] = useState<string | null>(null);
  const [showHeaderDropdown, setShowHeaderDropdown] = useState<string | null>(
    null
  );
  const [showBodyDropdown, setShowBodyDropdown] = useState<string | null>(null);
  const [imageModalStep, setImageModalStep] = useState<
    "initial" | "upload" | "toolkit"
  >("initial");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ id: string; name: string; url: string }>
  >([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showInsertAt, setShowInsertAt] = useState<number | null>(null);
  const [showImageModal, setShowImageModal] = useState<{
    blockId: string;
    index?: number;
  } | null>(null); // Added declaration

  const [showPropertyListingModal, setShowPropertyListingModal] =
    useState(false);
  const [isPreview, setIsPreview] = useState(false); // Used for preview toggle
  const [currentImageBlockId, setCurrentImageBlockId] = useState<string | null>(
    null
  );
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showContentSettingsModal, setShowContentSettingsModal] =
    useState(false);
  const [insertPosition, setInsertPosition] = useState<number | null>(null);
  const [showPublishSettings, setShowPublishSettings] = useState(false); // Added publish settings modal state

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalType, setSuccessModalType] = useState<
    "draft" | "publish" | "schedule"
  >("draft");
  const [publishedBlogLink, setPublishedBlogLink] = useState("");

  const availablePropertyListings: PropertyListing[] = [
    {
      id: "listing-1",
      title: "Soft Cotton Pants Luxury",
      description: "Peaceful countryside retreat...",
      location: "England, UK",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-2",
      title: "Soft Cotton Pants Luxury",
      description: "Peaceful countryside retreat...",
      location: "England, UK",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-3",
      title: "Soft Cotton Pants Luxury",
      description: "Peaceful countryside retreat...",
      location: "England, UK",
      rating: 4.1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-4",
      title: "Cason's Cabin-Callaway Gardens Area",
      description: "Historic Property-Lake-Pool-Trails",
      location: "Carletonport, Alabama",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "listing-5",
      title: "Mountain View Retreat",
      description: "Stunning views and modern amenities",
      location: "Colorado, USA",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const handleAddPropertyListings = (listings: PropertyListing[]) => {
    setBlogContent({
      ...blogContent,
      propertyListings: [...blogContent.propertyListings, ...listings],
    });
  };

  const handleRemovePropertyListing = (id: string) => {
    setBlogContent({
      ...blogContent,
      propertyListings: blogContent.propertyListings.filter(
        (listing) => listing.id !== id
      ),
    });
  };

  const resizeRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".editor-block")) {
        setSelectedBlockId(null);
        setShowHeaderDropdown(null);
        setShowBodyDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addBlock = (type: ContentBlock["type"], content = "") => {
    // Added content parameter
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === "image-grid" ? ["", ""] : content, // Use content parameter
      size:
        type === "single-image"
          ? { width: 100, height: 500 }
          : type === "image-grid"
          ? { width: 100, height: 400 }
          : undefined,
      headerLevel: type === "header" ? 2 : undefined,
      bodySize: type === "body" ? "medium" : undefined,
    };
    setBlogContent({
      ...blogContent,
      blocks: [...blogContent.blocks, newBlock],
    });
  };

  const insertBlockAt = (
    type: ContentBlock["type"],
    index: number,
    content = ""
  ) => {
    // Added content parameter
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: type === "image-grid" ? ["", ""] : content, // Use content parameter
      size:
        type === "single-image"
          ? { width: 100, height: 500 }
          : type === "image-grid"
          ? { width: 100, height: 400 }
          : undefined,
      headerLevel: type === "header" ? 2 : undefined,
      bodySize: type === "body" ? "medium" : undefined,
    };
    const newBlocks = [...blogContent.blocks];
    newBlocks.splice(index, 0, newBlock);
    setBlogContent({
      ...blogContent,
      blocks: newBlocks,
    });
    setShowInsertAt(null);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlogContent({
      ...blogContent,
      blocks: blogContent.blocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block
      ),
    });
  };

  const deleteBlock = (id: string) => {
    setBlogContent({
      ...blogContent,
      blocks: blogContent.blocks.filter((block) => block.id !== id),
    });
  };

  const addImageToGrid = (blockId: string) => {
    const block = blogContent.blocks.find((b) => b.id === blockId);
    if (!block || block.type !== "image-grid") return;

    const currentContent = block.content as string[];
    if (currentContent.length >= 3) return;

    const newContent = [...currentContent, ""];
    updateBlock(blockId, { content: newContent });
  };

  const removeImageFromGrid = (blockId: string, index: number) => {
    const block = blogContent.blocks.find((b) => b.id === blockId);
    if (!block || block.type !== "image-grid") return;

    const currentContent = block.content as string[];
    if (currentContent.length <= 2) return; // Minimum 2 images

    const newContent = currentContent.filter((_, idx) => idx !== index);
    updateBlock(blockId, { content: newContent });
  };

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlock(blockId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedBlock) return;

    const sourceIndex = blogContent.blocks.findIndex(
      (b) => b.id === draggedBlock
    );
    if (sourceIndex === -1 || sourceIndex === targetIndex) {
      setDraggedBlock(null);
      setDragOverIndex(null);
      return;
    }

    const newBlocks = [...blogContent.blocks];
    const [movedBlock] = newBlocks.splice(sourceIndex, 1);
    newBlocks.splice(targetIndex, 0, movedBlock);

    setBlogContent({
      ...blogContent,
      blocks: newBlocks,
    });

    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDragOverIndex(null);
  };

  const applyFormatting = (blockId: string, format: string) => {
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

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newPos = start + formattedText.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    blockId: string
  ) => {
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
        const block = blogContent.blocks.find((b) => b.id === blockId);
        if (block && typeof block.content === "string") {
          const newContent =
            content.substring(0, cursorPos) +
            "\n• " +
            content.substring(cursorPos);
          updateBlock(blockId, { content: newContent });
          setTimeout(() => {
            textarea.focus();
            const newPos = cursorPos + 3; // "\n• "
            textarea.setSelectionRange(newPos, newPos);
          }, 0);
        }
        return;
      }

      // Check for numbered list
      const numberMatch = currentLine.match(/^(\d+)\.\s/);
      if (numberMatch) {
        e.preventDefault();
        const block = blogContent.blocks.find((b) => b.id === blockId);
        if (block && typeof block.content === "string") {
          const currentNum = Number.parseInt(numberMatch[1]);
          const nextNum = currentNum + 1;
          const newContent =
            content.substring(0, cursorPos) +
            `\n${nextNum}. ` +
            content.substring(cursorPos);
          updateBlock(blockId, { content: newContent });
          setTimeout(() => {
            textarea.focus();
            const newPos = cursorPos + `\n${nextNum}. `.length;
            textarea.setSelectionRange(newPos, newPos);
          }, 0);
        }
        return;
      }

      // Check for quote
      const quoteMatch = currentLine.match(/^>\s/);
      if (quoteMatch) {
        e.preventDefault();
        const block = blogContent.blocks.find((b) => b.id === blockId);
        if (block && typeof block.content === "string") {
          const newContent =
            content.substring(0, cursorPos) +
            "\n> " +
            content.substring(cursorPos);
          updateBlock(blockId, { content: newContent });
          setTimeout(() => {
            textarea.focus();
            const newPos = cursorPos + 3; // "\n> "
            textarea.setSelectionRange(newPos, newPos);
          }, 0);
        }
        return;
      }
    }
  };

  const handleResizeStart = (
    e: React.MouseEvent,
    blockId: string,
    block: ContentBlock
  ) => {
    e.preventDefault();
    setResizingBlock(blockId);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: block.size?.width || 100,
      startHeight: block.size?.height || 400,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;

      const deltaY = moveEvent.clientY - resizeRef.current.startY;
      const newHeight = Math.max(100, resizeRef.current.startHeight + deltaY);

      updateBlock(blockId, {
        size: { width: block.size?.width || 100, height: newHeight },
      });
    };

    const handleMouseUp = () => {
      setResizingBlock(null);
      resizeRef.current = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

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
    console.log(
      "[v0] \n======================================================="
    );
    setSuccessModalType("draft");
    setShowSuccessModal(true);
  };

  const publishBlog = () => {
    if (!blogContent.title.trim()) {
      alert("Please add a title to your blog post before publishing.");
      return;
    }
    setShowPublishSettings(true);
  };

  const handleFinalPublish = (settings: PublishSettings) => {
    const updatedContent = {
      ...blogContent,
      publishSettings: settings,
      blogType: blogType, // Save blog type
      selectedMerchant: selectedMerchant, // Save selected merchant
    };
    setBlogContent(updatedContent);

    const markdown = convertToMarkdown();
    console.log(
      "[v0] ==================== BLOG PUBLISHED ===================="
    );
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
    console.log(
      "[v0] \n==========================================================="
    );
    setShowPublishSettings(false);
    const generatedLink = `https://directstayblog/${blogContent.title
      .toLowerCase()
      .replace(/\s+/g, "")}/${Date.now()}`;
    setPublishedBlogLink(generatedLink);
    setSuccessModalType("publish");
    setShowSuccessModal(true);
  };

  const handleSchedule = (date: string, time: string) => {
    const markdown = convertToMarkdown();
    console.log(
      "[v0] ==================== BLOG SCHEDULED ===================="
    );
    console.log("[v0] Blog Title:", blogContent.title || "Untitled");
    console.log("[v0] Scheduled For:", `${date} at ${time}`);
    console.log("[v0] Content Blocks:", blogContent.blocks.length);
    console.log("[v0] \n--- MARKDOWN CONTENT ---\n");
    console.log(markdown);
    console.log(
      "[v0] \n======================================================="
    );
    setShowScheduleModal(false);
    setSuccessModalType("schedule");
    setShowSuccessModal(true);
  };

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

  const getBodyTextSize = (size?: string) => {
    const sizes = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    };
    return sizes[size as keyof typeof sizes] || sizes.medium;
  };

  const openImageModal = (blockId: string, index?: number) => {
    setShowImageModal({ blockId, index });
    setImageModalStep("initial");
    setSelectedImages([]);
    setImageUrlInput("");
  };

  const closeImageModal = () => {
    setShowImageModal(null);
    setImageModalStep("initial");
    setSelectedImages([]);
    setImageUrlInput("");
  };

  const handleImageSubmit = () => {
    if (!showImageModal || !imageUrlInput.trim()) return;

    const { blockId, index } = showImageModal;
    const block = blogContent.blocks.find((b) => b.id === blockId);
    if (!block) return;

    if (block.type === "image-grid" && index !== undefined) {
      const newContent = [...(block.content as string[])];
      newContent[index] = imageUrlInput;
      updateBlock(blockId, { content: newContent });
    } else if (block.type === "single-image") {
      updateBlock(blockId, { content: imageUrlInput });
    }

    setImageUrlInput("");
    setShowImageModal(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        const newImage = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          url: imageUrl,
        };
        setUploadedImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOverGrid = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnModal = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          const newImage = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            url: imageUrl,
          };
          setUploadedImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const toggleImageSelection = (imageUrl: string) => {
    setSelectedImages((prev) =>
      prev.includes(imageUrl)
        ? prev.filter((url) => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  const handleAddMediaFromSelection = () => {
    if (!showImageModal || selectedImages.length === 0) return;

    const { blockId, index } = showImageModal;
    const block = blogContent.blocks.find((b) => b.id === blockId);
    if (!block) return;

    if (block.type === "image-grid" && index !== undefined) {
      const newContent = [...(block.content as string[])];
      newContent[index] = selectedImages[0];
      updateBlock(blockId, { content: newContent });
    } else if (block.type === "single-image") {
      updateBlock(blockId, { content: selectedImages[0] });
    }

    closeImageModal();
  };

  const mediaToolkitImages = [
    {
      id: "1",
      name: "Beach House View",
      url: "/images/macbook-20pro-2014-20-2099-20-281-29.jpg",
    },
    { id: "2", name: "Modern Interior", url: "/modern-interior.png" },
    { id: "3", name: "City Skyline", url: "/vibrant-city-skyline.png" },
    { id: "4", name: "Mountain View", url: "/majestic-mountain-vista.png" },
    { id: "5", name: "Ocean Sunset", url: "/ocean-sunset.png" },
    { id: "6", name: "Forest Path", url: "/forest-path.png" },
    { id: "7", name: "Desert Dunes", url: "/desert-dunes.png" },
    { id: "8", name: "Urban Architecture", url: "/urban-architecture.png" },
    { id: "9", name: "Garden Paradise", url: "/garden-paradise.jpg" },
  ];

  const availableMerchants: Merchant[] = [
    {
      id: "1",
      name: "Dynasty Luxury Cafe",
      description: "Premium coffee and dining experience",
      location: "32, John Crescent, Alhambra, Calif...",
      avatar: "/cozy-corner-cafe.png",
      image: "/cozy-corner-cafe.png", // Added image for merchant search
    },
    {
      id: "2",
      name: "Art Nerds Gallery",
      description: "Contemporary art gallery showcasing local artists",
      location: "32, John Crescent, Alhambra, Calif...",
      avatar: "/abstract-fluid-art.png",
      image: "/abstract-fluid-art.png", // Added image for merchant search
    },
    {
      id: "3",
      name: "Holiday Nomads",
      description: "Travel agency specializing in adventure tours",
      location: "32, John Crescent, Alhambra, Calif...",
      avatar: "/diverse-travelers-world-map.png",
      image: "/diverse-travelers-world-map.png", // Added image for merchant search
    },
    {
      id: "4",
      name: "Paint and Sip Place",
      description: "Creative painting studio with refreshments",
      location: "32, John Crescent, Alhambra, Calif...",
      avatar: "/colorful-paint-splatters.png",
      image: "/colorful-paint-splatters.png", // Added image for merchant search
    },
  ];

  const filteredMerchants = availableMerchants.filter((merchant) =>
    merchant.name.toLowerCase().includes(merchantSearchQuery.toLowerCase())
  );

  const handleAIGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation with merchant context
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate content based on merchant context
    let generatedContent = prompt;
    if (selectedMerchant && blogType === "sponsored") {
      generatedContent = `${prompt} featuring ${selectedMerchant.name}. ${selectedMerchant.description}`;
    }

    // Add the generated content as a body block
    addBlock("body", generatedContent);
    setAiPrompt("");
    setIsGenerating(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={onBack}
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            Write a Blog Post
          </button>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-[#5B6FFF] font-medium">Start with AI</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
        >
          {" "}
          {/* Updated onClick handler */}
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          {isPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Panel */}
        {!isPreview && ( // Changed from !showPreview to !isPreview
          <div className="w-[280px] border-r border-border bg-muted/30 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* Blog Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                      {blogType === "sponsored" ? (
                        <TrendingUp className="w-3 h-3 text-primary" />
                      ) : (
                        <span className="text-xs">😊</span>
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {blogType === "sponsored"
                        ? "Sponsored Blog"
                        : "Personal Blog"}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform",
                      isDropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <button
                      onClick={() => {
                        setBlogType("personal");
                        setSelectedBlog("Personal Blog");
                        setSelectedMerchant(null);
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left",
                        blogType === "personal" && "bg-muted"
                      )}
                    >
                      <span className="text-xs">😊</span>
                      Personal Blog
                    </button>
                    <button
                      onClick={() => {
                        setBlogType("sponsored");
                        setSelectedBlog("Sponsored Blog");
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors text-left",
                        blogType === "sponsored" && "bg-muted"
                      )}
                    >
                      <TrendingUp className="w-3 h-3 text-primary" />
                      Sponsored Blog
                    </button>
                  </div>
                )}
              </div>

              {blogType === "sponsored" && (
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search for merchant..."
                      value={merchantSearchQuery}
                      onChange={(e) => setMerchantSearchQuery(e.target.value)}
                      onFocus={() => setShowMerchantSearch(true)}
                      className="w-full pl-9 pr-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {showMerchantSearch && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {availableMerchants
                        .filter((m) =>
                          m.name
                            .toLowerCase()
                            .includes(merchantSearchQuery.toLowerCase())
                        )
                        .map((merchant) => (
                          <button
                            key={merchant.id}
                            onClick={() => {
                              setSelectedMerchant(merchant);
                              setShowMerchantSearch(false);
                              setMerchantSearchQuery("");
                            }}
                            className="w-full flex items-center gap-3 px-3 py-3 hover:bg-muted transition-colors text-left border-b border-border last:border-b-0"
                          >
                            <img
                              src={merchant.avatar || "/placeholder.svg"}
                              alt={merchant.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">
                                {merchant.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {merchant.location}
                              </div>
                            </div>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Add Element */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-1">
                  Add Element
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => addBlock("header")}
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <Type
                      className="w-6 h-6 text-foreground font-bold"
                      strokeWidth={3}
                    />
                    <span className="text-xs font-medium">Header Text</span>
                  </button>
                  <button
                    onClick={() => addBlock("body")}
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <Type className="w-5 h-5 text-foreground" strokeWidth={2} />
                    <span className="text-xs font-medium">Body Text</span>
                  </button>
                  <button
                    onClick={() => addBlock("single-image")}
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <ImageIcon className="w-6 h-6 text-foreground" />
                    <span className="text-xs font-medium">Single Image</span>
                  </button>
                  <button
                    onClick={() => addBlock("image-grid")}
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <Grid3x3 className="w-6 h-6 text-foreground" />
                    <span className="text-xs font-medium">Grid Image</span>
                  </button>
                </div>
              </div>

              {/* Add Attachments */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-1">
                  Add Attachments
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowPropertyListingModal(true)}
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <Building2 className="w-6 h-6 text-foreground" />
                    <span className="text-xs font-medium">
                      Property Listing
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors">
                    <Link2 className="w-6 h-6 text-foreground" />
                    <span className="text-xs font-medium">Links</span>
                  </button>
                </div>
              </div>

              {/* Add Custom Settings */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-1">
                  Add Custom Settings
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setShowContentSettingsModal(true)}
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <Settings className="w-6 h-6 text-foreground" />
                    <span className="text-xs font-medium">
                      Content Settings
                    </span>
                  </button>
                  <button
                    onClick={() => setShowPublishSettings(true)} // Added onClick handler
                    className="flex flex-col items-center gap-2 p-4 bg-background border border-border rounded-lg hover:bg-muted hover:border-[#5B6FFF] transition-colors"
                  >
                    <Bell className="w-6 h-6 text-foreground" />
                    <span className="text-xs font-medium">
                      Publish Settings
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={publishBlog}
                  className="w-full bg-[#5B6FFF] hover:bg-[#4A5EE8]"
                >
                  Publish
                </Button>
                <Button
                  onClick={saveToDraft}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  Save to Draft
                </Button>
                <Button
                  onClick={() => setShowScheduleModal(true)}
                  variant="ghost"
                  className="w-full text-muted-foreground"
                >
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto bg-background">
          <div className="max-w-4xl mx-auto py-8">
            {/* Main editor content */}
            <div className="flex-1 overflow-y-auto">
              <div
                className="max-w-4xl mx-auto py-8"
                style={{
                  paddingLeft: `${
                    blogContent.contentSettings?.marginPadding || 48
                  }px`,
                  paddingRight: `${
                    blogContent.contentSettings?.marginPadding || 48
                  }px`,
                }}
              >
                {isPreview ? (
                  <div
                    className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-12"
                    style={{
                      padding: `${
                        blogContent.contentSettings?.marginPadding || 48
                      }px`,
                    }}
                  >
                    {blogContent.title && (
                      <h1 className="text-5xl font-bold mb-8 text-balance">
                        {blogContent.title}
                      </h1>
                    )}
                    {blogContent.blocks.map((block) => (
                      <div key={block.id} className="mb-6">
                        {block.type === "header" && (
                          <>
                            {block.headerLevel === 1 && (
                              <h1 className="text-5xl font-bold text-balance">
                                {block.content}
                              </h1>
                            )}
                            {block.headerLevel === 2 && (
                              <h2 className="text-4xl font-bold text-balance">
                                {block.content}
                              </h2>
                            )}
                            {block.headerLevel === 3 && (
                              <h3 className="text-3xl font-bold text-balance">
                                {block.content}
                              </h3>
                            )}
                            {block.headerLevel === 4 && (
                              <h4 className="text-2xl font-bold text-balance">
                                {block.content}
                              </h4>
                            )}
                            {block.headerLevel === 5 && (
                              <h5 className="text-xl font-bold text-balance">
                                {block.content}
                              </h5>
                            )}
                            {block.headerLevel === 6 && (
                              <h6 className="text-lg font-bold text-balance">
                                {block.content}
                              </h6>
                            )}
                          </>
                        )}
                        {block.type === "body" && (
                          <div
                            className={cn(
                              "whitespace-pre-wrap",
                              block.bodySize === "small" && "text-sm",
                              block.bodySize === "medium" && "text-base",
                              block.bodySize === "large" && "text-lg"
                            )}
                            dangerouslySetInnerHTML={{
                              __html: (block.content as string)
                                .replace(
                                  /\*\*(.*?)\*\*/g,
                                  "<strong>$1</strong>"
                                )
                                .replace(
                                  /(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g,
                                  "<em>$1</em>"
                                )
                                .replace(/~~(.*?)~~/g, "<del>$1</del>")
                                .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
                                .replace(
                                  /`(.*?)`/g,
                                  "<code class='bg-muted px-1 rounded'>$1</code>"
                                )
                                .replace(
                                  /\[(.*?)\]$$(.*?)$$/g,
                                  "<a href='$2' class='text-[#5B6FFF] underline'>$1</a>"
                                )
                                .replace(
                                  /^- (.*)$/gm,
                                  "<li class='ml-4'>$1</li>"
                                )
                                .replace(
                                  /^\d+\. (.*)$/gm,
                                  "<li class='ml-4 list-decimal'>$1</li>"
                                )
                                .replace(
                                  /^> (.*)$/gm,
                                  "<blockquote class='border-l-4 border-[#5B6FFF] pl-4 italic'>$1</blockquote>"
                                ),
                            }}
                          />
                        )}
                        {block.type === "single-image" && block.content && (
                          <img
                            src={
                              (block.content as string) || "/placeholder.svg"
                            }
                            alt="Blog content"
                            className="w-full rounded-lg object-cover"
                            style={{ height: block.size?.height || 500 }}
                          />
                        )}
                        {block.type === "image-grid" && (
                          <div
                            className={cn(
                              "grid gap-4",
                              (block.content as string[]).length === 2 &&
                                "grid-cols-2",
                              (block.content as string[]).length === 3 &&
                                "grid-cols-3",
                              (block.content as string[]).length > 3 &&
                                "grid-cols-2 md:grid-cols-3"
                            )}
                          >
                            {(block.content as string[]).map(
                              (img, idx) =>
                                img && (
                                  <img
                                    key={idx}
                                    src={img || "/placeholder.svg"}
                                    alt={`Grid image ${idx + 1}`}
                                    className="w-full rounded-lg object-cover"
                                    style={{
                                      height: block.size?.height || 400,
                                    }}
                                  />
                                )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {blogType === "sponsored" &&
                      selectedMerchant &&
                      blogContent.blocks.length > 0 && (
                        <div className="mb-8 flex items-center justify-between p-4 bg-background border-2 border-dashed border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <img
                                src={
                                  selectedMerchant.avatar || "/placeholder.svg"
                                }
                                alt={selectedMerchant.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                                ✓
                              </div>
                            </div>
                            <span className="font-semibold text-foreground">
                              {selectedMerchant.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                              Collab
                            </span>
                            <button
                              onClick={() => {
                                setSelectedMerchant(null);
                                setBlogType("personal");
                              }}
                              className="p-1 hover:bg-muted rounded transition-colors"
                            >
                              <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                      )}

                    {/* Empty state with AI input - only show when no blocks exist */}
                    {blogContent.blocks.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-24 px-8">
                        {isGenerating ? (
                          <>
                            <div className="w-24 h-24 bg-[#5B6FFF]/10 rounded-full flex items-center justify-center mb-8 opacity-50">
                              <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-[#5B6FFF]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-muted-foreground mb-12">
                              Start Creating Your Blog
                            </h2>
                            <div className="w-16 h-16 bg-[#5B6FFF] rounded-full flex items-center justify-center animate-pulse">
                              <div className="flex gap-1">
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-24 h-24 bg-[#5B6FFF]/10 rounded-full flex items-center justify-center mb-8">
                              <div className="w-12 h-12 bg-[#5B6FFF]/20 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-6 h-6 text-[#5B6FFF]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-12">
                              Start Creating Your Blog
                            </h2>
                            <div className="w-full max-w-2xl space-y-4">
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder={
                                    selectedMerchant && blogType === "sponsored"
                                      ? `Write a blog using the offer of the ${selectedMerchant.name}`
                                      : "What do you want to explore today?"
                                  }
                                  value={aiPrompt}
                                  onChange={(e) => setAiPrompt(e.target.value)}
                                  className="w-full px-6 py-4 pr-24 text-base border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-[#5B6FFF]/20 focus:border-[#5B6FFF] transition-all"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && aiPrompt.trim()) {
                                      handleAIGenerate(aiPrompt);
                                    }
                                  }}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                  <button
                                    className="p-2 hover:bg-accent rounded-full transition-colors"
                                    title="Voice input"
                                    onClick={() => {
                                      alert("Voice input feature coming soon!");
                                    }}
                                  >
                                    <Mic className="w-5 h-5 text-muted-foreground" />
                                  </button>
                                  <button
                                    className="p-2 bg-[#5B6FFF] hover:bg-[#5B6FFF]/90 rounded-full transition-colors"
                                    title="Send"
                                    onClick={() => {
                                      if (aiPrompt.trim()) {
                                        handleAIGenerate(aiPrompt);
                                      }
                                    }}
                                  >
                                    <Send className="w-5 h-5 text-white" />
                                  </button>
                                </div>
                              </div>

                              {/* Show selected merchant tag */}
                              {selectedMerchant && blogType === "sponsored" && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full w-fit">
                                  <img
                                    src={
                                      selectedMerchant.avatar ||
                                      "/placeholder.svg"
                                    }
                                    alt={selectedMerchant.name}
                                    className="w-6 h-6 rounded-full object-cover"
                                  />
                                  <span className="text-sm font-medium">
                                    {selectedMerchant.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div
                      className="relative h-8 group"
                      onMouseEnter={() => setShowInsertAt(0)}
                      onMouseLeave={() => setShowInsertAt(null)}
                    >
                      {showInsertAt === 0 && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2 bg-background border border-border rounded-lg shadow-lg p-2 z-10">
                          <button
                            onClick={() => insertBlockAt("header", 0)}
                            className="p-2 hover:bg-muted rounded"
                            title="Add Header"
                          >
                            <Type className="w-4 h-4" strokeWidth={3} />
                          </button>
                          <button
                            onClick={() => insertBlockAt("body", 0)}
                            className="p-2 hover:bg-muted rounded"
                            title="Add Body Text"
                          >
                            <Type className="w-4 h-4" strokeWidth={2} />
                          </button>
                          <button
                            onClick={() => insertBlockAt("single-image", 0)}
                            className="p-2 hover:bg-muted rounded"
                            title="Add Image"
                          >
                            <ImageIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => insertBlockAt("image-grid", 0)}
                            className="p-2 hover:bg-muted rounded"
                            title="Add Grid"
                          >
                            <Grid3x3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-border opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#5B6FFF] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Render blocks */}
                    {blogContent.blocks.map((block, index) => (
                      <div key={block.id}>
                        <div
                          className="relative"
                          style={{
                            marginBottom:
                              index < blogContent.blocks.length - 1 ||
                              blogContent.propertyListings.length > 0
                                ? `${
                                    blogContent.contentSettings
                                      ?.sectionSpacing || 48
                                  }px`
                                : "0",
                          }}
                        >
                          <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, block.id)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            className={cn(
                              "editor-block relative group",
                              selectedBlockId === block.id &&
                                "ring-2 ring-[#5B6FFF] rounded-lg",
                              draggedBlock === block.id && "opacity-50",
                              dragOverIndex === index &&
                                "border-t-2 border-[#5B6FFF]"
                            )}
                            onClick={() => setSelectedBlockId(block.id)}
                          >
                            {/* Drag Handle */}
                            <div className="absolute -left-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                              <GripVertical className="w-5 h-5 text-muted-foreground" />
                            </div>

                            {/* Block Controls */}
                            <div className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteBlock(block.id);
                                }}
                                className="p-1 bg-background border border-border rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Header Block */}
                            {block.type === "header" && (
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
                                    e.target.style.height =
                                      e.target.scrollHeight + "px";
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    });
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value.trim()) {
                                      e.target.style.height = "auto";
                                    }
                                  }}
                                  onKeyDown={(e) =>
                                    handleTextareaKeyDown(e, block.id)
                                  }
                                  placeholder="Enter header text..."
                                  className={cn(
                                    "w-full font-bold text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none focus:ring-0 resize-none overflow-hidden",
                                    getHeaderStyles(block.headerLevel || 2)
                                  )}
                                  rows={1}
                                />
                                {selectedBlockId === block.id && (
                                  <div className="flex items-center gap-1 p-2 bg-[#5B6FFF] rounded-lg w-fit">
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "bold")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Bold"
                                    >
                                      <Bold className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "italic")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Italic"
                                    >
                                      <Italic className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "underline")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Underline"
                                    >
                                      <Underline className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(
                                          block.id,
                                          "strikethrough"
                                        )
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Strikethrough"
                                    >
                                      <Strikethrough className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "link")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Link"
                                    >
                                      <Link className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Body Text Block */}
                            {block.type === "body" && (
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
                                    e.target.style.height =
                                      e.target.scrollHeight + "px";
                                    updateBlock(block.id, {
                                      content: e.target.value,
                                    });
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value.trim()) {
                                      e.target.style.height = "auto";
                                    }
                                  }}
                                  onKeyDown={(e) =>
                                    handleTextareaKeyDown(e, block.id)
                                  }
                                  placeholder="Start typing your content..."
                                  className={cn(
                                    "w-full text-foreground placeholder:text-muted-foreground/50 bg-transparent border-none outline-none focus:ring-0 resize-none overflow-hidden min-h-[60px]",
                                    getBodyTextSize(block.bodySize)
                                  )}
                                  rows={3}
                                />
                                {selectedBlockId === block.id && (
                                  <div className="flex items-center gap-1 p-2 bg-[#5B6FFF] rounded-lg w-fit flex-wrap">
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "bold")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Bold"
                                    >
                                      <Bold className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "italic")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Italic"
                                    >
                                      <Italic className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "underline")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Underline"
                                    >
                                      <Underline className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(
                                          block.id,
                                          "strikethrough"
                                        )
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Strikethrough"
                                    >
                                      <Strikethrough className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-white/30" />
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "link")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Link"
                                    >
                                      <Link className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "code")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Inline Code"
                                    >
                                      <Code className="w-4 h-4" />
                                    </button>
                                    <div className="w-px h-6 bg-white/30" />
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "ul")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Bullet List"
                                    >
                                      <List className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "ol")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Numbered List"
                                    >
                                      <ListOrdered className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() =>
                                        applyFormatting(block.id, "quote")
                                      }
                                      className="p-1.5 hover:bg-white/20 rounded transition-colors text-white"
                                      title="Quote"
                                    >
                                      <Quote className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Single Image Block */}
                            {block.type === "single-image" && (
                              <div className="relative group/image">
                                {block.content ? (
                                  <div className="relative">
                                    <img
                                      src={
                                        (block.content as string) ||
                                        "/placeholder.svg"
                                      }
                                      alt="Blog content"
                                      className="w-full rounded-lg object-cover"
                                      style={{
                                        height: block.size?.height || 500,
                                      }}
                                    />
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openImageModal(block.id);
                                      }}
                                      className="absolute top-2 right-2 p-2 bg-background/90 border border-border rounded opacity-0 group-hover/image:opacity-100 transition-opacity"
                                    >
                                      <Upload className="w-4 h-4" />
                                    </button>
                                    <div
                                      className="absolute bottom-0 left-0 right-0 h-2 bg-[#5B6FFF] opacity-0 group-hover:opacity-50 cursor-ns-resize rounded-b-lg"
                                      onMouseDown={(e) =>
                                        handleResizeStart(e, block.id, block)
                                      }
                                    />
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => openImageModal(block.id)}
                                    className="w-full h-[500px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 hover:bg-muted/50 transition-colors"
                                  >
                                    <Upload className="w-8 h-8 text-muted-foreground" />
                                    <div className="text-center">
                                      <p className="text-sm font-medium text-foreground">
                                        Upload Banner Image
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Full width by default
                                      </p>
                                    </div>
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Image Grid Block */}
                            {block.type === "image-grid" && (
                              <div className="relative group/grid">
                                <div
                                  className={cn(
                                    "grid gap-4",
                                    (block.content as string[]).length === 2 &&
                                      "grid-cols-2",
                                    (block.content as string[]).length === 3 &&
                                      "grid-cols-3",
                                    (block.content as string[]).length > 3 &&
                                      "grid-cols-2 md:grid-cols-3"
                                  )}
                                >
                                  {(block.content as string[]).map(
                                    (img, idx) => (
                                      <div
                                        key={idx}
                                        className="relative group/grid-item"
                                      >
                                        {img ? (
                                          <>
                                            <img
                                              src={img || "/placeholder.svg"}
                                              alt={`Grid image ${idx + 1}`}
                                              className="w-full rounded-lg object-cover"
                                              style={{
                                                height:
                                                  block.size?.height || 400,
                                              }}
                                            />
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openImageModal(block.id, idx);
                                              }}
                                              className="absolute top-2 right-2 p-2 bg-background/90 border border-border rounded opacity-0 group-hover/grid-item:opacity-100 transition-opacity"
                                            >
                                              <Upload className="w-4 h-4" />
                                            </button>
                                            {(block.content as string[])
                                              .length > 2 && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  removeImageFromGrid(
                                                    block.id,
                                                    idx
                                                  );
                                                }}
                                                className="absolute top-2 left-2 p-2 bg-destructive/90 text-destructive-foreground border border-border rounded opacity-0 group-hover/grid-item:opacity-100 transition-opacity"
                                                title="Remove image"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            )}
                                          </>
                                        ) : (
                                          <button
                                            onClick={() =>
                                              openImageModal(block.id, idx)
                                            }
                                            className="w-full h-[400px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors"
                                          >
                                            <Upload className="w-6 h-6 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">
                                              Upload Image
                                            </span>
                                          </button>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                                {(block.content as string[]).length < 3 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addImageToGrid(block.id);
                                    }}
                                    className="mt-4 w-full py-3 border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                                  >
                                    <Plus className="w-5 h-5" />
                                    <span className="text-sm font-medium">
                                      Add Image to Grid
                                    </span>
                                  </button>
                                )}
                                <div
                                  className="absolute bottom-0 left-0 right-0 h-2 bg-[#5B6FFF] opacity-0 group-hover/grid:opacity-50 cursor-ns-resize rounded-b-lg"
                                  onMouseDown={(e) =>
                                    handleResizeStart(e, block.id, block)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Insert Zone */}
                        <div
                          className="relative h-8 group"
                          onMouseEnter={() => setShowInsertAt(index + 1)}
                          onMouseLeave={() => setShowInsertAt(null)}
                        >
                          {showInsertAt === index + 1 && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2 bg-background border border-border rounded-lg shadow-lg p-2 z-10">
                              <button
                                onClick={() =>
                                  insertBlockAt("header", index + 1)
                                }
                                className="p-2 hover:bg-muted rounded"
                                title="Add Header"
                              >
                                <Type className="w-4 h-4" strokeWidth={3} />
                              </button>
                              <button
                                onClick={() => insertBlockAt("body", index + 1)}
                                className="p-2 hover:bg-muted rounded"
                                title="Add Body Text"
                              >
                                <Type className="w-4 h-4" strokeWidth={2} />
                              </button>
                              <button
                                onClick={() =>
                                  insertBlockAt("single-image", index + 1)
                                }
                                className="p-2 hover:bg-muted rounded"
                                title="Add Image"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  insertBlockAt("image-grid", index + 1)
                                }
                                className="p-2 hover:bg-muted rounded"
                                title="Add Grid"
                              >
                                <Grid3x3 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          <div className="absolute top-1/2 left-0 right-0 h-px bg-border opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#5B6FFF] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {blogContent.propertyListings.length > 0 && (
                      <div className="mt-8 space-y-4">
                        {blogContent.propertyListings.map((listing) => (
                          <div
                            key={listing.id}
                            className="flex items-center gap-4 p-4 bg-white border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                          >
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.title}
                              className="w-20 h-20 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-sm mb-1">
                                {listing.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{listing.location}</span>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleRemovePropertyListing(listing.id)
                              }
                              className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`bg-background border border-border rounded-lg ${
              imageModalStep === "initial" ? "max-w-2xl" : "max-w-5xl"
            } w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2 text-sm">
                <h3 className="text-lg font-semibold">Upload Image</h3>
                {imageModalStep === "toolkit" && (
                  <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Media Tool Kit
                    </span>
                  </>
                )}
                {imageModalStep === "upload" && (
                  <>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Upload from Computer
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={closeImageModal}
                className="p-1 hover:bg-muted rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Initial Step - Choose Upload Method */}
              {imageModalStep === "initial" && (
                <div
                  className="flex flex-col items-center justify-center py-16"
                  onDragOver={handleDragOverGrid}
                  onDrop={handleDropOnModal}
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">
                    Drop your files here or browse
                  </h4>
                  <p className="text-sm text-muted-foreground mb-8">
                    max file up to 1 GB
                  </p>

                  <div className="flex gap-3">
                    <label htmlFor="file-upload-initial">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer bg-transparent"
                        onClick={() =>
                          document
                            .getElementById("file-upload-initial")
                            ?.click()
                        }
                      >
                        Upload from Computer
                      </Button>
                    </label>
                    <input
                      id="file-upload-initial"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handleFileUpload(e);
                        setImageModalStep("upload");
                      }}
                      className="hidden"
                    />
                    <Button
                      onClick={() => setImageModalStep("toolkit")}
                      className="bg-[#5B6FFF] hover:bg-[#4A5EE8]"
                    >
                      Browse Medial Toolkit
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload from Computer Step */}
              {imageModalStep === "upload" && (
                <div>
                  <div className="grid grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div
                        key={image.id}
                        className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedImages.includes(image.url)
                            ? "border-[#5B6FFF] ring-2 ring-[#5B6FFF]/20"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => toggleImageSelection(image.url)}
                      >
                        {selectedImages.includes(image.url) && (
                          <div className="absolute top-2 left-2 w-5 h-5 bg-[#5B6FFF] rounded flex items-center justify-center z-10">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium truncate">
                              {image.name}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Show context menu
                              }}
                              className="p-1 hover:bg-white/20 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {uploadedImages.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-muted-foreground mb-4">
                        No images uploaded yet
                      </p>
                      <label htmlFor="file-upload-more">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            document.getElementById("file-upload-more")?.click()
                          }
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Images
                        </Button>
                      </label>
                      <input
                        id="file-upload-more"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Media Toolkit Step */}
              {imageModalStep === "toolkit" && (
                <div>
                  <div className="grid grid-cols-4 gap-4">
                    {mediaToolkitImages.map((image) => (
                      <div
                        key={image.id}
                        className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedImages.includes(image.url)
                            ? "border-[#5B6FFF] ring-2 ring-[#5B6FFF]/20"
                            : "border-transparent hover:border-gray-300"
                        }`}
                        onClick={() => toggleImageSelection(image.url)}
                      >
                        {selectedImages.includes(image.url) && (
                          <div className="absolute top-2 left-2 w-5 h-5 bg-[#5B6FFF] rounded flex items-center justify-center z-10">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium truncate">
                              {image.name}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Show context menu
                              }}
                              className="p-1 hover:bg-white/20 rounded"
                            >
                              <MoreVertical className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {(imageModalStep === "upload" || imageModalStep === "toolkit") && (
              <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
                <Button onClick={closeImageModal} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMediaFromSelection}
                  disabled={selectedImages.length === 0}
                  className="bg-[#5B6FFF] hover:bg-[#4A5EE8]"
                >
                  Add Media
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <PropertyListingModal
        isOpen={showPropertyListingModal}
        onClose={() => setShowPropertyListingModal(false)}
        onAddListings={handleAddPropertyListings}
        availableListings={availablePropertyListings}
      />

      {showContentSettingsModal && (
        <ContentSettingsModal
          contentSettings={
            blogContent.contentSettings || {
              sectionSpacing: 48,
              marginPadding: 48,
            }
          }
          onClose={() => setShowContentSettingsModal(false)}
          onSave={(settings) => {
            setBlogContent({ ...blogContent, contentSettings: settings });
            setShowContentSettingsModal(false);
          }}
        />
      )}

      <PublishSettingsModal
        isOpen={showPublishSettings}
        onClose={() => setShowPublishSettings(false)}
        onPublish={handleFinalPublish}
        initialTitle={blogContent.title}
      />

      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleSchedule}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type={successModalType}
        shareLink={
          successModalType === "publish" ? publishedBlogLink : undefined
        }
        onPreview={() => setIsPreview(true)}
      />
    </div>
  );
}
