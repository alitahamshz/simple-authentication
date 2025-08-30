import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const url = request.nextUrl;

  const protectedPaths = ["/profile", "/dashboard"];
  const isProtected = protectedPaths.some((path) =>
    url.pathname.startsWith(path)
  );

  // کاربر لاگین نکرده → جلو دسترسی به صفحه محافظت‌شده رو بگیر
  if (isProtected && !session?.accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // کاربر لاگین کرده → اجازه نده صفحه signin ببینه
  if (url.pathname === "/auth/signin" && session?.accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/auth/signin","/dashboard"],
};
