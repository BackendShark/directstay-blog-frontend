"use client";

import type React from "react";

import { useState } from "react";
import {
  Upload,
  MoreVertical,
  Check,
  GridIcon,
  ListIcon,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MediaAsset } from "@/app/dashboard/media-toolkit/page";

type MediaToolkitContentProps = {
  mediaAssets: MediaAsset[];
  setMediaAssets: (assets: MediaAsset[]) => void;
};

export function MediaToolkitContent({
  mediaAssets,
  setMediaAssets,
}: MediaToolkitContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newAssets: MediaAsset[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      fileType: file.type.includes("png") ? "PNG File" : "JPG File",
      fileSize: `${Math.round(file.size / 1024)} KB`,
    }));

    setMediaAssets([...mediaAssets, ...newAssets]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const toggleAssetSelection = (id: string) => {
    setSelectedAssets((prev) =>
      prev.includes(id)
        ? prev.filter((assetId) => assetId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setMediaAssets(mediaAssets.filter((asset) => asset.id !== id));
    setSelectedAssets(selectedAssets.filter((assetId) => assetId !== id));
  };

  const handleRename = (id: string) => {
    const asset = mediaAssets.find((a) => a.id === id);
    if (!asset) return;

    const newName = prompt("Enter new name:", asset.name);
    if (newName) {
      setMediaAssets(
        mediaAssets.map((a) => (a.id === id ? { ...a, name: newName } : a))
      );
    }
  };

  const handleMakeCopy = (id: string) => {
    const asset = mediaAssets.find((a) => a.id === id);
    if (!asset) return;

    const newAsset: MediaAsset = {
      ...asset,
      id: Math.random().toString(36).substr(2, 9),
      name: `${asset.name} (copy)`,
    };

    setMediaAssets([...mediaAssets, newAsset]);
  };

  const handleDeleteSelected = () => {
    setMediaAssets(
      mediaAssets.filter((asset) => !selectedAssets.includes(asset.id))
    );
    setSelectedAssets([]);
    setShowDeleteDialog(false);
  };

  if (mediaAssets.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-8 py-6 border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground">
            Media Toolkit
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your media assets in a personalized library.
          </p>
        </div>

        <div
          className={`flex-1 flex items-center justify-center ${
            isDragging ? "bg-accent/50" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Drop your media assets here for easy access
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              max file up to 1 GB
            </p>
            <Button
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.multiple = true;
                input.accept = "image/*";
                input.onchange = (e) =>
                  handleFileUpload((e.target as HTMLInputElement).files);
                input.click();
              }}
            >
              Upload from Computer
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header moved to top */}
      <div className="px-8 py-6 border-b border-border">
        <h1 className="text-2xl font-semibold text-foreground">
          Media Toolkit
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your media assets in a personalized library.
        </p>
      </div>

      {/* Controls moved above content */}
      <div className="px-8 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                Sort by
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="opacity-50"
                >
                  <path
                    d="M2 3h8M2 6h6M2 9h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Date uploaded</DropdownMenuItem>
              <DropdownMenuItem>Name</DropdownMenuItem>
              <DropdownMenuItem>File size</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedAssets.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedAssets.length})
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            className="gap-2"
            onClick={() => setViewMode("list")}
          >
            <ListIcon className="w-4 h-4" />
            List
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className="gap-2"
            onClick={() => setViewMode("grid")}
          >
            <GridIcon className="w-4 h-4" />
            Grid
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-4 gap-6">
            {mediaAssets.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              return (
                <div
                  key={asset.id}
                  className={`group relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#5B6FFF] ring-2 ring-[#5B6FFF]/20"
                      : "border-border hover:border-[#5B6FFF]/50"
                  }`}
                  onClick={() => toggleAssetSelection(asset.id)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={asset.url || "/placeholder.svg"}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-card flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {isSelected && (
                        <div className="w-5 h-5 rounded bg-[#5B6FFF] flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-foreground truncate">
                        {asset.name}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="p-1 hover:bg-accent rounded">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleRename(asset.id)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="mr-2"
                          >
                            <path
                              d="M11.333 2L14 4.667l-9.333 9.333H2v-2.667L11.333 2z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleMakeCopy(asset.id)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="mr-2"
                          >
                            <rect
                              x="5"
                              y="5"
                              width="9"
                              height="9"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M3 11V3a1 1 0 011-1h8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          Make a Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(asset.id)}
                          className="text-destructive"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="mr-2"
                          >
                            <path
                              d="M2 4h12M6.5 7v5M9.5 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9M6 4V2.5A.5.5 0 016.5 2h3a.5.5 0 01.5.5V4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {mediaAssets.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              return (
                <div
                  key={asset.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[#5B6FFF] bg-[#5B6FFF]/5 ring-2 ring-[#5B6FFF]/20"
                      : "border-border hover:bg-accent/50"
                  }`}
                  onClick={() => toggleAssetSelection(asset.id)}
                >
                  {isSelected && (
                    <div className="w-5 h-5 rounded bg-[#5B6FFF] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <img
                    src={asset.url || "/placeholder.svg"}
                    alt={asset.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {asset.name}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground w-40">
                    Uploaded - {asset.uploadDate}
                  </div>
                  <div className="text-sm text-muted-foreground w-24">
                    {asset.fileType}
                  </div>
                  <div className="text-sm text-muted-foreground w-20 text-right">
                    {asset.fileSize}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="p-1 hover:bg-accent rounded">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRename(asset.id)}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="mr-2"
                        >
                          <path
                            d="M11.333 2L14 4.667l-9.333 9.333H2v-2.667L11.333 2z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleMakeCopy(asset.id)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="mr-2"
                        >
                          <rect
                            x="5"
                            y="5"
                            width="9"
                            height="9"
                            rx="1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M3 11V3a1 1 0 011-1h8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Make a Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(asset.id)}
                        className="text-destructive"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="mr-2"
                        >
                          <path
                            d="M2 4h12M6.5 7v5M9.5 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9M6 4V2.5A.5.5 0 016.5 2h3a.5.5 0 01.5.5V4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedAssets.length}{" "}
              {selectedAssets.length === 1 ? "image" : "images"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected media assets from your library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSelected}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
