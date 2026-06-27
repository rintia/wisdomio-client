import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
   return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}

export const config = {
  matcher: ["/dashboard/add-lesson", "/lessons/:path", '/dashboard/user/my-lessons', '/dashboard/user/favorites', '/dashboard/user/profile', '/dashboard/user/my-lessons/path', '/dashboard/user', '/upgrade'],
};