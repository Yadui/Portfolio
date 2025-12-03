"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import Image from "next/image";

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setCoverImage(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload error");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ 
        title, 
        content, 
        tags, 
        coverImage 
      }),
    });

    if (res.ok) {
      router.push("/blog");
    } else {
      alert("Failed to create post");
    }
    setLoading(false);
  };

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      status: false,
      placeholder: "Write your masterpiece...",
      minHeight: "400px",
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary pt-32 px-4 md:px-12 pb-20">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Title & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white/60 font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-zinc-900 border-white/10 text-white h-12 text-lg"
                placeholder="Enter post title"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/60 font-medium">Tags (comma separated)</label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="bg-zinc-900 border-white/10 text-white h-12"
                placeholder="tech, life, coding"
              />
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="text-white/60 font-medium">Cover Image</label>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="bg-zinc-900 border-white/10 text-white file:bg-accent file:text-primary file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:font-bold hover:file:bg-accent/90 cursor-pointer h-14 pt-2"
                />
                {uploading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent text-sm font-bold animate-pulse">
                    Uploading...
                  </div>
                )}
              </div>
            </div>
            {coverImage && (
              <div className="mt-4 relative w-full h-64 rounded-xl overflow-hidden border border-white/10 group">
                <Image 
                  src={coverImage} 
                  alt="Cover preview" 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-bold"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Rich Text Editor */}
          <div className="space-y-2 prose-editor-wrapper">
            <label className="text-white/60 font-medium">Content</label>
            <div className="bg-white rounded-lg overflow-hidden text-black">
              <SimpleMDE
                value={content}
                onChange={useCallback((value) => setContent(value), [])}
                options={mdeOptions}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              disabled={loading || uploading} 
              className="bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-lg font-bold"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
