"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminAuthModal, setIsAdminAuthModal] = useState(false);
  const [pin, setPin] = useState("");
  const [mounted, setMounted] = useState(false); // ✅ Vercel-এর Hydration ফিক্সের জন্য

  const user = session?.user;

  // ১. মাউন্ট চেক এবং অথেন্টিকেশন লজিক
  useEffect(() => {
    setMounted(true); // কম্পোনেন্ট ব্রাউজারে লোড হয়েছে কিনা নিশ্চিত করে

    // লগইন চেক
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login");
    }

    // এডমিন ভেরিফিকেশন চেক (Client-side logic)
    if (status === "authenticated" && user?.role === "admin") {
      // sessionStorage সরাসরি useEffect-এর বাইরে লিখলে Vercel-এ এরর দেয়
      const isVerified = sessionStorage.getItem("admin_verified");
      if (isVerified !== "true") {
        setIsAdminAuthModal(true);
      }
    }
  }, [status, user, pathname, router]);

  const handleAdminVerify = () => {
    if (pin === "1234") {
      sessionStorage.setItem("admin_verified", "true");
      setIsAdminAuthModal(false); 
      setPin("");
      router.refresh(); 
    } else {
      alert("Invalid Security Pin!");
      setPin("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdminVerify();
  };

  // ✅ মাউন্ট হওয়ার আগে বা সেশন লোড হওয়ার সময় কিছুই রেন্ডার করবে না 
  // এটি Vercel-এ "Text content does not match" এরর আসা বন্ধ করবে
  if (!mounted || status === "loading") return null;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white h-20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-full flex justify-between items-center">
          
          <Link href="/" className="flex items-center transform scale-90 sm:scale-100 origin-left">
            <Logo />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <Link href="/dashboard" className={`hover:text-white transition ${pathname === '/dashboard' ? 'text-yellow-500 font-bold' : ''}`}>Dashboard</Link>
            
            {user?.role === "admin" ? (
              <>
                <Link href="/admin/fleet" className={`hover:text-white transition ${pathname === '/admin/fleet' ? 'text-yellow-500 font-bold' : ''}`}>Manage Fleet</Link>
                <Link href="/admin/analytics" className={`hover:text-white transition ${pathname === '/admin/analytics' ? 'text-yellow-500 font-bold' : ''}`}>Analytics</Link>
              </>
            ) : (
              <>
                <Link href="/live-map" className={`hover:text-white transition ${pathname === '/live-map' ? 'text-yellow-500 font-bold' : ''}`}>Live Map</Link>
                <Link href="/missions" className={`hover:text-white transition ${pathname === '/missions' ? 'text-yellow-500 font-bold' : ''}`}>My Missions</Link>
              </>
            )}
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4 relative">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold leading-none">{user?.name || "Operator"}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">{user?.role}</p>
              </div>
            </div>

            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-yellow-500 transition-all overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-yellow-500 font-black text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-14 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-200 ">
                <div className="px-4 py-3 border-b border-slate-800 mb-2">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Operator Profile</p>
                  <p className="text-sm font-bold truncate text-white">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate font-mono">{user?.email}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Link href="/profile" className="px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition">View Command Center</Link>
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition mt-1"
                  >
                    Terminate Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- ADMIN EXTRA SECURITY MODAL --- */}
      {isAdminAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl text-center border-t-yellow-500/50">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/20 text-4xl shadow-[0_0_30px_rgba(234,179,8,0.1)]">
              🔐
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter">Auth Required</h2>
            <p className="text-slate-500 text-[10px] mb-8 font-bold uppercase tracking-widest leading-relaxed">Admin Terminal Access<br/>Verification Required</p>
            
            <input 
              type="password" 
              maxLength={4}
              value={pin}
              autoFocus
              onKeyDown={handleKeyDown}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-black/50 border border-slate-800 p-5 rounded-2xl text-white text-center text-3xl tracking-[0.8em] focus:border-yellow-500 outline-none mb-8 font-mono"
              placeholder="****"
            />
            <button 
              onClick={handleAdminVerify}
              className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-lg active:scale-95"
            >
              Unlock Terminal
            </button>
          </div>
        </div>
      )}
    </>
  );
}