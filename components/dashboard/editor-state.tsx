"use client";

import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { BlogEditorProvider, useBlogEditor } from "./blog-editor-context";
import { BlogEditorHeader } from "./blog-editor-header";
import { BlogEditorSidebar } from "./blog-editor-sidebar";
import { BlogAIPrompt } from "./blog-ai-prompt";
import { BlogContentBlocks } from "./blog-content-blocks";
import { BlogPreview } from "./blog-preview";
import { BlogActions } from "./blog-actions";
import { ScheduleModal } from "./schedule-modal";
import { SuccessModal } from "./success-modal";
import { PropertyListingModal } from "./property-listing-modal";
import { ContentSettingsModal } from "./content-settings-modal";
import { PublishSettingsModal } from "./publish-settings-modal";
import {
  BlogContent,
  PropertyListing,
  PublishSettings,
} from "@/app/dashboard/blog-editor/page";

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
  const [showPropertyListingModal, setShowPropertyListingModal] = useState(false);
  const [showContentSettingsModal, setShowContentSettingsModal] = useState(false);
  const [showPublishSettings, setShowPublishSettings] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalType, setSuccessModalType] = useState<"draft" | "publish" | "schedule">("draft");
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

  return (
    <BlogEditorProvider initialContent={blogContent} onContentChange={setBlogContent}>
      <EditorStateInner
        onBack={onBack}
        blogContent={blogContent}
        setBlogContent={setBlogContent}
        showPropertyListingModal={showPropertyListingModal}
        setShowPropertyListingModal={setShowPropertyListingModal}
        showContentSettingsModal={showContentSettingsModal}
        setShowContentSettingsModal={setShowContentSettingsModal}
        showPublishSettings={showPublishSettings}
        setShowPublishSettings={setShowPublishSettings}
        showScheduleModal={showScheduleModal}
        setShowScheduleModal={setShowScheduleModal}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        successModalType={successModalType}
        setSuccessModalType={setSuccessModalType}
        publishedBlogLink={publishedBlogLink}
        setPublishedBlogLink={setPublishedBlogLink}
        availablePropertyListings={availablePropertyListings}
        handleAddPropertyListings={handleAddPropertyListings}
        handleRemovePropertyListing={handleRemovePropertyListing}
      />
    </BlogEditorProvider>
  );
}

function EditorStateInner({
  onBack,
  blogContent,
  setBlogContent,
  showPropertyListingModal,
  setShowPropertyListingModal,
  showContentSettingsModal,
  setShowContentSettingsModal,
  showPublishSettings,
  setShowPublishSettings,
  showScheduleModal,
  setShowScheduleModal,
  showSuccessModal,
  setShowSuccessModal,
  successModalType,
  setSuccessModalType,
  publishedBlogLink,
  setPublishedBlogLink,
  availablePropertyListings,
  handleAddPropertyListings,
  handleRemovePropertyListing,
}: any) {
  const { setIsPreview } = useBlogEditor();
  
  const blogActions = BlogActions({
    onShowPublishSettings: () => setShowPublishSettings(true),
    onShowScheduleModal: () => setShowScheduleModal(true),
    onShowSuccessModal: (type: "draft" | "publish" | "schedule") => {
      setSuccessModalType(type);
      setShowSuccessModal(true);
    },
    onSetPublishedBlogLink: setPublishedBlogLink,
  });

  return (
    <div className="h-full flex flex-col">
      <BlogEditorHeader onBack={onBack} />

      <div className="flex-1 flex overflow-hidden">
        <BlogEditorSidebarWrapper
          onPublish={blogActions.publishBlog}
          onSaveToDraft={blogActions.saveToDraft}
          onSchedule={() => setShowScheduleModal(true)}
          onShowPropertyListingModal={() => setShowPropertyListingModal(true)}
          onShowContentSettingsModal={() => setShowContentSettingsModal(true)}
          onShowPublishSettingsModal={() => setShowPublishSettings(true)}
        />

        <div className="flex-1 overflow-y-auto bg-background">
          <div
            className="max-w-4xl mx-auto py-8"
            style={{
              paddingLeft: `${blogContent.contentSettings?.marginPadding || 48}px`,
              paddingRight: `${blogContent.contentSettings?.marginPadding || 48}px`,
            }}
          >
            <BlogEditorContent
              blogContent={blogContent}
              onRemovePropertyListing={handleRemovePropertyListing}
            />
          </div>
        </div>
      </div>

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
        onPublish={blogActions.handleFinalPublish}
        initialTitle={blogContent.title}
      />

      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={blogActions.handleSchedule}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type={successModalType}
        shareLink={successModalType === "publish" ? publishedBlogLink : undefined}
        onPreview={() => {
          setShowPublishSettings(false);
          setIsPreview(true);
        }}
        onBackToEditor={() => {
          setShowPublishSettings(false);
          setIsPreview(false);
        }}
      />
    </div>
  );
}

function BlogEditorSidebarWrapper(props: any) {
  const { isPreview } = useBlogEditor();
  
  if (isPreview) return null;
  
  return <BlogEditorSidebar {...props} />;
}

function BlogEditorContent({ blogContent, onRemovePropertyListing }: {
  blogContent: BlogContent;
  onRemovePropertyListing: (id: string) => void;
}) {
  const { isPreview, blogType, selectedMerchant, setBlogType, setSelectedMerchant } = useBlogEditor();

  return (
    <>
      {isPreview ? (
        <BlogPreview />
      ) : (
        <div>
          {blogType === "sponsored" && selectedMerchant && blogContent.blocks.length > 0 && (
            <div className="mb-8 flex items-center justify-between p-4 bg-background border-2 border-dashed border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedMerchant.avatar || "/placeholder.svg"}
                    alt={selectedMerchant.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                </div>
                <span className="font-semibold text-foreground">{selectedMerchant.name}</span>
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

          {blogContent.blocks.length === 0 && <BlogAIPrompt />}

          <BlogContentBlocks />

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
                    onClick={() => onRemovePropertyListing(listing.id)}
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
    </>
  );
}