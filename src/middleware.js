import { withAuth } from "next-auth/middleware";

// Instead of the shorthand export, we use withAuth to explicitly 
// export the middleware function
export default withAuth(
  function middleware(req) {
    // This function can be left empty; withAuth handles the redirect logic
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};