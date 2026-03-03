"use client";
import FleetOverview from "./FleetOverview";
import AgencyTable from "./AgencyTable"; // নতুন টেবিল কম্পোনেন্ট
import RealTimeAlerts from "./RealTimeAlerts"; // ডানদিকের জন্য নতুন কম্পোনেন্ট


export default function AdminDashboardParent({ user }) {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-300 font-mono p-4 lg:p-6 selection:bg-yellow-500/30">
      
      
      {/* ২. ফ্লিট ওভারভিউ (সবার উপরে) */}
      <FleetOverview />

      {/* ৩. মেইন কন্টেন্ট গ্রিড */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* বাম দিকের বড় অংশ (ম্যাপ এবং এজেন্সি টেবিল) */}
        <div className="xl:col-span-9 space-y-6">
          
          
          <div className="bg-[#151921] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
             <h3 className="text-xs font-black text-white/40 uppercase mb-4 tracking-widest px-2">Active_Agencies_Database</h3>
             <AgencyTable />
          </div>
        </div>

        {/* ডান দিকের অংশ (লাইভ কল/ইউজার প্রোফাইল) */}
        <div className="xl:col-span-3">
           <RealTimeAlerts />
        </div>

      </div>
    </div>
  );
}