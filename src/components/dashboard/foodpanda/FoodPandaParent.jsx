"use client";
import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle, 
  User, 
  LogOut,
  BarChart3,
  Search
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const FoodPandaParent = () => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex">
      {/* Sidebar - FoodPanda Edition */}
      <aside className="w-64 border-r border-pink-500/10 bg-[#0a0a0a] flex flex-col">
        <div className="p-8 border-b border-pink-500/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d70f64] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(215,15,100,0.3)]">
            <ShoppingBag className="text-white w-6 h-6" />
          </div>
          <span className="font-black tracking-tighter text-xl">FP_TERMINAL</span>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <NavItem icon={<Truck size={18} />} label="LIVE_DELIVERIES" active />
          <NavItem icon={<ShoppingBag size={18} />} label="ORDER_HISTORY" />
          <NavItem icon={<MapPin size={18} />} label="ZONE_HEATMAP" />
          <NavItem icon={<BarChart3 size={18} />} label="EARNING_LOGS" />
        </nav>

        <div className="p-6 border-t border-pink-500/10">
          <button 
            onClick={() => signOut()}
            className="flex items-center gap-3 text-pink-500/60 hover:text-pink-500 transition-all group w-full"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold tracking-widest">EXIT_SYSTEM</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-pink-500/10 flex items-center justify-between px-10 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
             <Search size={16} className="text-white/30" />
             <input type="text" placeholder="SEARCH_ORDER_ID..." className="bg-transparent border-none outline-none text-[10px] w-48 tracking-widest" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-white/30 uppercase tracking-widest">Active Operator</p>
              <p className="text-xs font-black text-pink-500 uppercase">{session?.user?.name || "FP_UNIT_01"}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-pink-500/30 p-1">
               <div className="w-full h-full bg-pink-500/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-pink-500" />
               </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatusBox icon={<Clock className="text-yellow-500" />} label="PENDING" count="12" />
            <StatusBox icon={<Truck className="text-blue-500" />} label="ON_THE_WAY" count="08" />
            <StatusBox icon={<CheckCircle className="text-green-500" />} label="DELIVERED" count="142" />
            <StatusBox icon={<ShoppingBag className="text-pink-500" />} label="CANCELLED" count="03" />
          </div>

          {/* Active Order Table */}
          <section className="bg-[#0a0a0a] border border-pink-500/10 rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-pink-500/10 flex justify-between items-center bg-white/[0.02]">
              <h3 className="text-xs font-black tracking-[0.3em] uppercase flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 animate-ping rounded-full" />
                Live_Dispatch_Monitor
              </h3>
              <button className="text-[10px] bg-pink-500/10 text-pink-500 px-3 py-1 rounded-md border border-pink-500/20 font-bold hover:bg-pink-500 hover:text-white transition-all">REFRESH_SYNC</button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5">
                    <th className="p-6">Order_ID</th>
                    <th className="p-6">Location</th>
                    <th className="p-6">ETA</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs font-bold divide-y divide-white/5">
                  <OrderRow id="#FP-9921" loc="Dhanmondi, Rd 27" eta="12m" status="In Transit" />
                  <OrderRow id="#FP-9925" loc="Gulshan 2, Circle" eta="05m" status="Preparing" color="text-yellow-500" />
                  <OrderRow id="#FP-9929" loc="Uttara, Sector 7" eta="24m" status="Dispatching" color="text-blue-500" />
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

// Sub-components
const NavItem = ({ icon, label, active = false }) => (
  <div className={`
    flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all border
    ${active ? "bg-pink-500/10 text-pink-500 border-pink-500/20 shadow-[0_0_15px_rgba(215,15,100,0.1)]" : "text-white/40 border-transparent hover:bg-white/5 hover:text-white"}
  `}>
    {icon}
    <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
  </div>
);

const StatusBox = ({ icon, label, count }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl group hover:border-pink-500/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <span className="text-2xl font-black italic tracking-tighter">{count}</span>
    </div>
    <p className="text-[10px] text-white/30 uppercase tracking-widest">{label}</p>
  </div>
);

const OrderRow = ({ id, loc, eta, status, color = "text-green-500" }) => (
  <tr className="hover:bg-white/[0.02] transition-colors group">
    <td className="p-6 font-mono text-pink-500">{id}</td>
    <td className="p-6 text-white/70">{loc}</td>
    <td className="p-6 flex items-center gap-2">
      <Clock size={12} className="text-white/20" /> {eta}
    </td>
    <td className="p-6">
      <span className={`px-2 py-1 bg-white/5 rounded-md ${color} text-[10px] uppercase`}>{status}</span>
    </td>
    <td className="p-6">
      <button className="text-[10px] uppercase tracking-tighter hover:underline">View_Details</button>
    </td>
  </tr>
);

export default FoodPandaParent;