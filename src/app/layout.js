import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthGuard from "@/components/auth/AuthGuard";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

// ফন্ট সেটআপ - মাথা নষ্ট লুকের জন্য
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Foring B2B | Drone Fleet Control",
  description: "Next-gen B2B Drone Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0f1a] text-slate-200`}
      >
        <AuthGuard>
          
          {/* গ্লোবাল টোস্টার - এক জায়গা থেকে সব মেইনটেইন হবে */}
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0f172a', // slate-900
                color: '#f8fafc',
                border: '1px solid #1e293b',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.5px',
              },
              success: {
                iconTheme: {
                  primary: '#eab308', // yellow-500
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444', // red-500
                  secondary: '#fff',
                },
              },
            }}
          />
          
          {/* মেইন কন্টেন্ট */}
          <Navbar></Navbar>
          <div className="min-h-screen mt-20 relative">
            {children}
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}