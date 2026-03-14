"use client";
import { Plane, Activity, CheckCircle2, AlertTriangle, Radio } from "lucide-react";

export default function FleetOverview() {
  const fleetStats = [
    { label: "Total Fleet", value: "24", icon: <Radio size={20}/>, color: "text-blue-400", bg: "bg-blue-500/5" },
    { label: "In-Flight", value: "08", icon: <Plane size={20} className="rotate-45"/>, color: "text-green-400", bg: "bg-green-500/5" },
    { label: "Grounded", value: "12", icon: <Activity size={20}/>, color: "text-slate-400", bg: "bg-slate-500/5" },
    { label: "Ready for Ops", value: "03", icon: <CheckCircle2 size={20}/>, color: "text-yellow-400", bg: "bg-yellow-500/5" },
    { label: "Technical Issues", value: "01", icon: <AlertTriangle size={20}/>, color: "text-red-500 animate-pulse", bg: "bg-red-500/5" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {fleetStats.map((stat, i) => (
        <div 
          key={i} 
          className={`relative overflow-hidden p-5 rounded-[2rem] border border-white/5 ${stat.bg} backdrop-blur-sm transition-all hover:scale-[1.02]`}
        >
          <div className={`${stat.color} mb-3`}>
            {stat.icon}
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white italic">{stat.value}</span>
              <span className="text-[10px] text-white/20 uppercase">Units</span>
            </div>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute -right-4 -bottom-4 opacity-5 scale-150">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}