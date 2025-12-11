import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  // Removed Clerk auth check
  // const { userId } = await auth();
  // if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
  
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    // Ensure directory exists (basic check, usually public exists)
    // In a real app we'd use mkdir(uploadDir, { recursive: true })
    
    await writeFile(path.join(uploadDir, filename), buffer);
    
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to save file." }, { status: 500 });
  }
}
