import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export default async function BlogList() {
  let allPosts = [];
  try {
    allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
  
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySession(token) : null;
  const isAdmin = !!session;

  return (
    <div className="min-h-screen bg-primary pt-32 px-4 md:px-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          {isAdmin && (
            <Link href="/blog/create">
              <Button className="bg-accent text-primary hover:bg-accent/90">Create Post</Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="group">
              <div className="bg-zinc-900/50 border border-white/10 rounded-xl h-full hover:border-accent transition-colors overflow-hidden flex flex-col">
                {post.coverImage && (
                  <div className="relative w-full h-48">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{post.title}</h2>
                  
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.split(',').map((tag, i) => (
                        <span key={i} className="text-xs bg-white/5 text-white/60 px-2 py-1 rounded-full">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-white/60 line-clamp-3 mb-4 flex-grow">{post.excerpt || post.content.substring(0, 150)}...</p>
                  <div className="text-sm text-white/40 mt-auto pt-4 border-t border-white/5">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {allPosts.length === 0 && (
            <p className="text-white/60 col-span-full text-center">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
