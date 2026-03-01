import { Toaster } from "react-hot-toast";
import AuthGuard from "@/components/auth/AuthGuard"; // তোর বানানো সেশন প্রোভাইডার

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>
          {/* এখানে টোস্টার রাখলে পুরো অ্যাপে কাজ করবে */}
          <Toaster 
            position="top-center" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b', // slate-800
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}