// Import the clerkMiddleware function from the Clerk Next.js server SDK.
// This function is the core of Clerk's authentication handling in Next.js middleware.
import { clerkMiddleware } from '@clerk/nextjs/server'

// Export the clerkMiddleware function as the default export.
// This tells Next.js to use Clerk to process incoming requests according
// to the defined configuration and Clerk application settings.
// It handles tasks like identifying the current user, managing sessions,
// and protecting routes based on authentication status.
export default clerkMiddleware()

// Export a configuration object for the Next.js middleware.
export const config = {
  /*
   * The `matcher` array defines the specific paths on which this middleware should run.
   * Middleware runs before cached content or route handlers are invoked.
   * By default, middleware runs on all paths, but using a matcher optimizes performance
   * by excluding paths that don't require authentication checks (like static assets).
   */
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - `_next/` (Next.js internals)
     * - static files (files with extensions like .html, .css, .js, images, fonts, etc.)
     * - This pattern uses a negative lookahead `(?!...)` to exclude these paths.
     * - It ensures the middleware focuses on actual page routes and API calls,
     *   not on serving static assets.
     */
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    /*
     * Always run the middleware for API routes (`/api/...`) and tRPC routes (`/trpc/...`).
     * This ensures that backend endpoints are consistently protected or processed
     * by the authentication middleware, regardless of the exclusion pattern above.
     */
    '/(api|trpc)(.*)',
  ],
}
