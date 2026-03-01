"use client";
import { SessionProvider } from "next-auth/react";

/**
 * AuthGuard Component
 * এটি মূলত NextAuth-এর SessionProvider-কে র‍্যাপ করে 
 * যাতে পুরো অ্যাপের যেকোনো কম্পোনেন্ট থেকে useSession() হুক ব্যবহার করা যায়।
 */
export default function AuthGuard({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}