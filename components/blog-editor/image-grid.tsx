"use client"
import { Check, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface ImageGridProps {
  images: string[]
  selectedImages: string[]
  onSelectionChange: (images: string[]) => void
  showContextMenu?: boolean
}

export function ImageGrid({ images, selectedImages, onSelectionChange, showContextMenu }: ImageGridProps) {
  const toggleSelection = (image: string) => {
    if (selectedImages.includes(image)) {
      onSelectionChange(selectedImages.filter((img) => img !== image))
    } else {
      onSelectionChange([...selectedImages, image])
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <div
            className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedImages.includes(image) ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"
            }`}
            onClick={() => toggleSelection(image)}
          >
            <img src={image || "/placeholder.svg"} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
            {selectedImages.includes(image) && (
              <div className="absolute top-2 left-2 w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-700 font-medium">Image Name</p>
            {showContextMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem>Make a Copy</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
