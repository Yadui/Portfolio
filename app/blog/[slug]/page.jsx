import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { eq } from "drizzle-orm";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }) {
  const { slug } = await params;
  let post;
  try {
     const result = await db.select().from(posts).where(eq(posts.slug, slug));
     post = result[0];
  } catch (e) {
    console.error(e);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary pt-32 px-4 md:px-12 pb-20">
      <div className="container mx-auto max-w-4xl">
        {post.coverImage && (
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 border border-white/10">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-12 text-white/60 border-b border-white/10 pb-8">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            {post.tags && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {post.tags.split(',').map((tag, i) => (
                    <span key={i} className="text-accent">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <article className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-white prose-code:text-accent prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
