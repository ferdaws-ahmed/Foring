"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, MapPin, History, Info, 
  Smartphone, Navigation, X, ExternalLink, 
  Phone, Package, ShieldCheck, MoreVertical 
} from "lucide-react";

const AdminDashboardParent = () => {
  const [agencies, setAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // ১. ডাটা ফেচ করা
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('/data/agencies.json');
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setAgencies(data);
      } catch (error) {
        console.error("Error loading agency data:", error);
      }
    };
    fetchAgencies();
  }, []);

  const filteredAgencies = agencies.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.ib.includes(searchTerm)
  );

  // রিডাইরেক্ট ফাংশন (Centralized)
  const handleRedirect = (role) => {
    if (role) {
      router.push(`/dashboard/${role}`);
    } else {
      console.error("Role not found for this agency!");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#020202] text-white font-mono overflow-hidden">
      
      {/* ফিক্সড টপ নেভিগেশন বার */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0a] z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-black font-black">A</div>
          <h1 className="text-xs font-black tracking-[0.2em] uppercase">Admin_Central_Console</h1>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-xl border border-white/10">
          <Search size={14} className="text-white/30" />
          <input 
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text" placeholder="SEARCH_DATABASE..." 
            className="bg-transparent border-none outline-none text-[10px] w-56 tracking-widest uppercase"
          />
        </div>
      </header>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* এজেন্সি টেবিল সেকশন */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[9px] text-white/20 uppercase tracking-[0.3em]">
                <th className="pb-4 pl-4">Agency_Identity</th>
                <th className="pb-4">Communication</th>
                <th className="pb-4">Volume</th>
                <th className="pb-4">Security_Status</th>
                <th className="pb-4 text-right pr-4">Terminal</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgencies.map((agency) => (
                <tr 
                  key={agency.id}
                  onClick={() => setSelectedAgency(agency)}
                  className={`group cursor-pointer transition-all border ${selectedAgency?.id === agency.id ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-white/[0.01] hover:bg-white/[0.04] border-white/5'} border rounded-xl`}
                >
                  <td className="p-4 first:rounded-l-xl border-y border-l border-inherit">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={agency.image} className="w-9 h-9 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-[#020202] rounded-full ${agency.nidStatus === 'Verified' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      </div>
                      <div>
                         <p className="text-xs font-black uppercase tracking-tighter">{agency.name}</p>
                         <p className="text-[9px] text-white/30 font-bold">{agency.ib}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-y border-inherit">
                    <div className="flex items-center gap-2 text-[10px] text-white/50 font-bold">
                      <Phone size={12} className="text-blue-500/50" /> {agency.phone || "01XXXXXXXXX"}
                    </div>
                  </td>
                  <td className="p-4 border-y border-inherit">
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <Package size={14} className="text-yellow-500/50" /> 
                      {agency.deliveryHistory?.length || 0} <span className="text-white/20 text-[8px]">ORDERS</span>
                    </div>
                  </td>
                  <td className="p-4 border-y border-inherit">
                    <div className="flex items-center gap-1.5">
                       <ShieldCheck size={12} className={agency.nidStatus === 'Verified' ? "text-green-500" : "text-yellow-500"} />
                       <span className={`text-[9px] font-black uppercase tracking-tighter ${agency.nidStatus === 'Verified' ? 'text-green-500' : 'text-yellow-500'}`}>
                         {agency.nidStatus}
                       </span>
                    </div>
                  </td>
                  <td className="p-4 last:rounded-r-xl border-y border-r border-inherit text-right pr-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // টেবিল রো এর ক্লিক ডিজেবল করবে
                        handleRedirect(agency.role);
                      }}
                      className="inline-flex items-center justify-center p-2.5 bg-white/5 hover:bg-yellow-500 hover:text-black rounded-lg transition-all border border-white/10 group/btn shadow-xl shadow-black/50"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* সাইডবার প্যানেল */}
        <aside className={`
          absolute right-0 top-0 h-full w-[380px] bg-[#0d0d0d] border-l border-white/10 
          transform transition-transform duration-500 ease-in-out z-40
          ${selectedAgency ? "translate-x-0 shadow-[-50px_0_100px_rgba(0,0,0,0.9)]" : "translate-x-full"}
        `}>
          {selectedAgency && (
            <div className="flex flex-col h-full relative">
              {/* প্যানেল হেডার */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">Operator_Profile</h3>
                <button onClick={() => setSelectedAgency(null)} className="hover:bg-red-500/20 hover:text-red-500 p-2 rounded-full transition-all">
                  <X size={18} />
                </button>
              </div>

              {/* প্যানেল বডি */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                
                {/* সাইডবার থেকে ড্যাশবোর্ড বাটন */}
                <button 
                  onClick={() => handleRedirect(selectedAgency.role)}
                  className="w-full py-4 bg-yellow-500 text-black font-black text-[10px] tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all uppercase italic shadow-lg shadow-yellow-500/10"
                >
                  <ExternalLink size={16} /> Open_User_Dashboard
                </button>

                <div>
                  <h2 className="text-2xl font-black text-yellow-500 uppercase italic tracking-tighter leading-tight">{selectedAgency.name}</h2>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">Ref_ID: {selectedAgency.ib} | SEC_UID: {selectedAgency.id}</p>
                </div>

                {/* লোকেশন ইনফো */}
                <div className="space-y-4">
                   <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <MapPin size={18} className="text-blue-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-bold text-white/30 uppercase mb-1">Pickup_Origin</p>
                        <p className="text-[11px] leading-relaxed">{selectedAgency.addresses?.pickup}</p>
                      </div>
                   </div>
                </div>

                {/* সিকিউরিটি সেকশন (NID) */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex justify-between items-center">
                   <div>
                     <p className="text-[9px] font-bold text-white/30 uppercase mb-1">NID_Identity</p>
                     <p className="text-sm font-black tracking-widest">{selectedAgency.nid}</p>
                     <span className="text-[9px] text-green-500 font-bold uppercase italic mt-1 inline-block">{selectedAgency.nidStatus}</span>
                   </div>
                   <div className="px-3 py-1.5 bg-white/10 rounded-lg border border-white/10 text-[7px] text-white/40 italic font-bold">IDENTITY_CARD</div>
                </div>

                {/* অপারেটর ইমেজ */}
                <div className="space-y-3">
                  <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                    <Info size={12} /> Captured_Operator_Image
                  </p>
                  <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
                    <img src={selectedAgency.image} className="w-full h-full object-cover transition-all group-hover:scale-110 duration-700" alt="" />
                  </div>
                </div>

                {/* লাইভ ট্র্যাকিং */}
                <div className="space-y-3">
                  <p className="text-[9px] font-bold text-red-500/70 uppercase tracking-widest flex items-center gap-2">
                    <Navigation size={12} className="animate-pulse" /> Live_Telemetry_Map
                  </p>
                  <div className="h-32 bg-blue-500/5 border border-blue-500/10 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('https://i.stack.imgur.com/HILmr.png')] bg-cover opacity-20 grayscale invert contrast-150"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-600 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-[8px] text-white/20 text-center uppercase tracking-[0.3em]">Device_IMEI: {selectedAgency.imei}</p>
                </div>

              </div>
            </div>
          )}
        </aside>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(234,179,8,0.2); }
      `}</style>
    </div>
  );
};

export default AdminDashboardParent;