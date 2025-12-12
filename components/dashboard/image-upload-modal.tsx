"use client";

import { useState } from "react";
import { X, Upload, Check, MoreVertical, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadModalProps {
  onClose: () => void;
  onImageSelect: (imageUrl: string) => void;
}

export function ImageUploadModal({ onClose, onImageSelect }: ImageUploadModalProps) {
  const [modalStep, setModalStep] = useState<"initial" | "upload" | "toolkit">("initial");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<
    Array<{ id: string; name: string; url: string }>
  >([]);

  const mediaToolkitImages = [
    { id: "1", name: "Beach House View", url: "/images/macbook-20pro-2014-20-2099-20-281-29.jpg" },
    { id: "2", name: "Modern Interior", url: "/modern-interior.png" },
    { id: "3", name: "City Skyline", url: "/vibrant-city-skyline.png" },
    { id: "4", name: "Mountain View", url: "/majestic-mountain-vista.png" },
    { id: "5", name: "Ocean Sunset", url: "/ocean-sunset.png" },
    { id: "6", name: "Forest Path", url: "/forest-path.png" },
    { id: "7", name: "Desert Dunes", url: "/desert-dunes.png" },
    { id: "8", name: "Urban Architecture", url: "/urban-architecture.png" },
    { id: "9", name: "Garden Paradise", url: "/garden-paradise.jpg" },
  ];

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
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
        : [imageUrl] // Only allow single selection
    );
  };

  const handleAddMedia = () => {
    if (selectedImages.length > 0) {
      onImageSelect(selectedImages[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`bg-background border border-border rounded-lg ${
          modalStep === "initial" ? "max-w-2xl" : "max-w-5xl"
        } w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2 text-sm">
            <h3 className="text-lg font-semibold">Upload Image</h3>
            {modalStep === "toolkit" && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Media Tool Kit</span>
              </>
            )}
            {modalStep === "upload" && (
              <>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Upload from Computer</span>
              </>
            )}
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Initial Step */}
          {modalStep === "initial" && (
            <div
              className="flex flex-col items-center justify-center py-16"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-medium mb-2">Drop your files here or browse</h4>
              <p className="text-sm text-muted-foreground mb-8">max file up to 1 GB</p>

              <div className="flex gap-3">
                <label htmlFor="file-upload-initial">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer bg-transparent"
                    onClick={() => document.getElementById("file-upload-initial")?.click()}
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
                    setModalStep("upload");
                  }}
                  className="hidden"
                />
                <Button
                  onClick={() => setModalStep("toolkit")}
                  className="bg-[#5B6FFF] hover:bg-[#4A5EE8]"
                >
                  Browse Media Toolkit
                </Button>
              </div>
            </div>
          )}

          {/* Upload Step */}
          {modalStep === "upload" && (
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
                        <p className="text-white text-sm font-medium truncate">{image.name}</p>
                        <button className="p-1 hover:bg-white/20 rounded">
                          <MoreVertical className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {uploadedImages.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No images uploaded yet</p>
                  <label htmlFor="file-upload-more">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload-more")?.click()}
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

          {/* Toolkit Step */}
          {modalStep === "toolkit" && (
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
                        <p className="text-white text-sm font-medium truncate">{image.name}</p>
                        <button className="p-1 hover:bg-white/20 rounded">
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
        {(modalStep === "upload" || modalStep === "toolkit") && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleAddMedia}
              disabled={selectedImages.length === 0}
              className="bg-[#5B6FFF] hover:bg-[#4A5EE8]"
            >
              Add Media
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}