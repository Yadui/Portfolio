import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Create users table if not exists (SQLite syntax)
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    // Check if admin exists
    const admin = await db.run(sql`SELECT * FROM users WHERE username = 'admin'`);
    
    // LibSQL/Drizzle raw result handling might vary, let's just try insert and ignore unique error
    try {
        await db.run(sql`
            INSERT INTO users (username, password) VALUES ('admin', 'password123')
        `);
        return NextResponse.json({ message: "Setup complete. User 'admin' created." });
    } catch (e) {
        return NextResponse.json({ message: "User 'admin' likely already exists.", error: e.message });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
