"use client";

import { cn } from "@/lib/utils";
import { useBlogEditor } from "./blog-editor-context";

export function BlogPreview() {
  const { blogContent } = useBlogEditor();
  const publishSettings = blogContent.publishSettings;

  return (
    <div
      className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-12"
      style={{
        padding: `${blogContent.contentSettings?.marginPadding || 48}px`,
      }}
    >
      {/* Blog Metadata */}
      {publishSettings?.thumbnail && (
        <div className="mb-8">
          <img
            src={publishSettings.thumbnail}
            alt="Blog thumbnail"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}
      
      {blogContent.title && (
        <h1 className="text-5xl font-bold mb-4 text-balance">{blogContent.title}</h1>
      )}
      
      {publishSettings?.description && (
        <p className="text-lg text-muted-foreground mb-4">{publishSettings.description}</p>
      )}
      
      {publishSettings?.tags && publishSettings.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {publishSettings.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      {blogContent.blocks.map((block) => (
        <div key={block.id} className="mb-6">
          {block.type === "header" && (
            <>
              {block.headerLevel === 1 && (
                <h1 className="text-5xl font-bold text-balance">{block.content}</h1>
              )}
              {block.headerLevel === 2 && (
                <h2 className="text-4xl font-bold text-balance">{block.content}</h2>
              )}
              {block.headerLevel === 3 && (
                <h3 className="text-3xl font-bold text-balance">{block.content}</h3>
              )}
              {block.headerLevel === 4 && (
                <h4 className="text-2xl font-bold text-balance">{block.content}</h4>
              )}
              {block.headerLevel === 5 && (
                <h5 className="text-xl font-bold text-balance">{block.content}</h5>
              )}
              {block.headerLevel === 6 && (
                <h6 className="text-lg font-bold text-balance">{block.content}</h6>
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
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
                  .replace(/~~(.*?)~~/g, "<del>$1</del>")
                  .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
                  .replace(/`(.*?)`/g, "<code class='bg-muted px-1 rounded'>$1</code>")
                  .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-[#5B6FFF] underline'>$1</a>")
                  .replace(/^• (.*)$/gm, "<li class='ml-4'>$1</li>")
                  .replace(/^\d+\. (.*)$/gm, "<li class='ml-4 list-decimal'>$1</li>")
                  .replace(/^> (.*)$/gm, "<blockquote class='border-l-4 border-[#5B6FFF] pl-4 italic'>$1</blockquote>"),
              }}
            />
          )}
          {block.type === "single-image" && block.content && (
            <img
              src={(block.content as string) || "/placeholder.svg"}
              alt="Blog content"
              className="w-full rounded-lg object-cover"
              style={{ height: block.size?.height || 500 }}
            />
          )}
          {block.type === "image-grid" && (
            <div
              className={cn(
                "grid gap-4",
                (block.content as string[]).length === 2 && "grid-cols-2",
                (block.content as string[]).length === 3 && "grid-cols-3",
                (block.content as string[]).length > 3 && "grid-cols-2 md:grid-cols-3"
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
  );
}