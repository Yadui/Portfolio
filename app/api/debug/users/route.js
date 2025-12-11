import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export async function GET() {
  try {
    const allUsers = await db.select().from(users).all();
    return NextResponse.json({ users: allUsers });
  } catch (error) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
