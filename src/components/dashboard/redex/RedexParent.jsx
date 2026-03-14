
"use client";
import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut, 
  Bell, 
  Activity,
  Zap,
  ShieldCheck
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const RedexParent = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-mono flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Zap className="text-black w-5 h-5 fill-current" />
          </div>
          <span className="font-black tracking-tighter text-xl">REDEX_OS</span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="OVERVIEW" active />
          <NavItem icon={<Package size={20} />} label="OPERATIONS" />
          <NavItem icon={<Activity size={20} />} label="STATISTICS" />
          <NavItem icon={<Settings size={20} />} label="TERMINAL_CFG" />
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 text-red-500/70 hover:text-red-500 transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="text-sm font-bold">TERMINATE_SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-xs text-white/40 uppercase tracking-[0.3em]">Operator Active</h1>
            <p className="font-bold text-yellow-500">ID: {session?.user?.email || "UNKNOWN_UNIT"}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <ShieldCheck className="text-green-500 w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Role: {session?.user?.role || "GUEST"}
              </span>
            </div>
            <Bell className="text-white/40 cursor-pointer hover:text-white" size={20} />
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-10 space-y-8">
          {/* Welcome Card */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 p-8 rounded-[2rem]">
            <div className="relative z-10">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">
                System Initialized: <span className="text-yellow-500">{session?.user?.name || "User"}</span>
              </h2>
              <p className="text-white/40 text-sm max-w-md">
                Welcome to the Redex Terminal. Your specific role-based modules are loaded and ready for execution.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full"></div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="TOTAL_TASKS" value="1,248" color="text-blue-500" />
            <StatCard label="UPTIME_RATIO" value="99.9%" color="text-green-500" />
            <StatCard label="SECURITY_LEVEL" value="STABLE" color="text-yellow-500" />
          </div>

          {/* Placeholder for Role-specific Module */}
          <div className="border border-dashed border-white/10 rounded-[2rem] h-64 flex flex-col items-center justify-center text-white/20">
             <div className="w-12 h-12 border-2 border-current rounded-full mb-4 flex items-center justify-center animate-pulse">
                <Zap size={24} />
             </div>
             <p className="text-xs uppercase tracking-widest">Role-Specific Module Loader</p>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components for cleaner code
const NavItem = ({ icon, label, active = false }) => (
  <div className={`
    flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all
    ${active ? "bg-white/10 text-white border border-white/10" : "text-white/40 hover:bg-white/5 hover:text-white"}
  `}>
    {icon}
    <span className="text-xs font-black tracking-widest uppercase">{label}</span>
  </div>
);

const StatCard = ({ label, value, color }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black ${color}`}>{value}</p>
  </div>
);

export default RedexParent;