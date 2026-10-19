import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const isProd = process.env.NODE_ENV === "production";

export default clerkMiddleware(
  async (auth, req) => {
    const { userId } = await auth();

    if (isAuthRoute(req) && userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    debug: !isProd,
    authorizedParties: process.env.NEXT_PUBLIC_APP_URL
      ? [process.env.NEXT_PUBLIC_APP_URL]
      : undefined,
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
