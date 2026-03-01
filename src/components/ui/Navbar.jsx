"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // User details from session
  const user = session?.user;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">F</div>
        <span className="text-xl font-bold tracking-tight hidden md:block">FORING <span className="text-yellow-500">B2B</span></span>
      </div>

      {/* Middle: Conditional Menu */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="/dashboard" className="hover:text-yellow-500 transition">Dashboard</Link>
        {user?.role === "admin" ? (
          <>
            <Link href="/admin/manage-drones" className="hover:text-yellow-500 transition">Fleet Management</Link>
            <Link href="/admin/reports" className="hover:text-yellow-500 transition">Analytics</Link>
          </>
        ) : (
          <>
            <Link href="/live-map" className="hover:text-yellow-500 transition">Live Tracking</Link>
            <Link href="/agent/missions" className="hover:text-yellow-500 transition">My Missions</Link>
          </>
        )}
      </div>

      {/* Right: Profile Section */}
      <div className="relative">
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 bg-slate-800 p-1 pr-3 rounded-full hover:bg-slate-700 transition"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border border-slate-600">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="text-sm hidden sm:block">{user?.name || "User"}</span>
        </button>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200">
            <div className="pb-3 border-b border-slate-700 mb-3">
              <p className="font-bold text-white">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
              <span className="inline-block mt-2 px-2 py-0.5 bg-yellow-900/30 text-yellow-500 text-[10px] uppercase font-bold rounded border border-yellow-800">
                {user?.role}
              </span>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li><Link href="/profile" className="block py-2 hover:text-yellow-500">View Profile</Link></li>
              <li><Link href="/settings" className="block py-2 hover:text-yellow-500">Account Settings</Link></li>
              <li className="pt-2">
                <button 
                  onClick={() => signOut()}
                  className="w-full text-left text-red-400 hover:text-red-300 font-medium"
                >
                  Logout System
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}