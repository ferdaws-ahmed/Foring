"use client";
import { User, PhoneIncoming, MapPin } from "lucide-react";

export default function RealTimeAlerts() {
  // এটা সকেট থেকে আসবে, আপাতত মক ডাটা
  const activeCall = {
    name: "Agent_Rahman",
    agency: "Emergency_Rescue_BD",
    id: "UAV-REQ-9902",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    location: "Dhaka_Sector_7"
  };

  return (
    <div className="space-y-4 sticky top-6">
      <h3 className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] mb-4">Incoming_Requests</h3>
      
      {/* Live Request Card (Animated Popup Style) */}
      <div className="bg-[#1a1f29] border-2 border-yellow-500/20 p-6 rounded-[2.5rem] animate-bounce-subtle shadow-[0_0_30px_rgba(234,179,8,0.05)]">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
             <img src={activeCall.img} className="w-20 h-20 rounded-full border-4 border-yellow-500 shadow-lg" alt="user" />
             <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-[#1a1f29] rounded-full animate-ping"></div>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase text-sm tracking-tighter">{activeCall.name}</h4>
            <p className="text-[9px] text-slate-500 font-bold">{activeCall.agency}</p>
          </div>

          <div className="w-full bg-black/30 p-3 rounded-2xl space-y-2">
             <div className="flex justify-between text-[8px] uppercase font-bold">
                <span className="text-slate-500">Request_ID:</span>
                <span className="text-yellow-500">{activeCall.id}</span>
             </div>
             <div className="flex justify-between text-[8px] uppercase font-bold">
                <span className="text-slate-500">Location:</span>
                <span className="text-white flex items-center gap-1"><MapPin size={8}/> {activeCall.location}</span>
             </div>
          </div>

          <button className="w-full py-3 bg-green-600 text-white font-black text-[10px] rounded-xl uppercase flex items-center justify-center gap-2 hover:bg-green-500 transition-all">
            <PhoneIncoming size={12} /> Dispatch_Drone
          </button>
        </div>
      </div>
    </div>
  );
}