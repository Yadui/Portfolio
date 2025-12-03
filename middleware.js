import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  if (path.startsWith("/blog/create")) {
    const token = req.cookies.get("session")?.value;
    const session = token ? await verifySession(token) : null;

    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/create/:path*"],
};
