import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, tags, coverImage } = await req.json();
  const slug = slugify(title, { lower: true, strict: true });
  const excerpt = content.substring(0, 150) + "...";

  try {
    await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt,
      tags,
      coverImage,
      createdAt: new Date(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
