import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // যদি লগইন করা থাকে
    if (token) {
      const userRole = token.role; // MongoDB থেকে আসা রোল (admin, redex, foodpanda ইত্যাদি)

      // ১. ডাইনামিক ড্যাশবোর্ড গার্ড
      // ইউজার যদি /dashboard দিয়ে শুরু হওয়া কোনো পাথে ঢুকে এবং সেই পাথটি তার রোলের না হয়
      if (path.startsWith("/dashboard")) {
        
        // চেক: পাথটি কি /dashboard/[userRole] দিয়ে শুরু হয়েছে? 
        // উদাহরণ: রোল 'redex' কিন্তু ইউজার ঢুকেছে '/dashboard/admin' এ
        if (!path.startsWith(`/dashboard/${userRole}`)) {
          
          // তাকে তার নিজস্ব রোলের পাথে রিডাইরেক্ট করে দাও
          return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // টোকেন না থাকলে সরাসরি রিডাইরেক্ট করবে লগইন পেজে
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  // সব ড্যাশবোর্ড রাউটে এই মিডলওয়্যার কাজ করবে
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};