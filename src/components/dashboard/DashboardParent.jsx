"use client";
import React from 'react';
import dynamic from 'next/dynamic'; // ডাইনামিক ইম্পোর্ট যোগ করুন
import FleetOverview from "./admin/FleetOverview";
import MissionTable from "./MissionTable";
import RealTimeAlerts from "./RealTimeAlerts";

// LiveMap কে SSR অফ করে ইম্পোর্ট করুন
const LiveMap = dynamic(() => import('./LiveMap'), { 
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-[#151921] animate-pulse rounded-[2.5rem] flex items-center justify-center text-white/20">Loading Real-time Map...</div>
});

export default function AdminDashboardParent({ user }) {
  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-300 font-mono p-2 lg:p-4 selection:bg-yellow-500/30">
      
      {/* ১. ফ্লিট ওভারভিউ (সবার উপরে) */}
      <div className="mb-6">
        <FleetOverview />
      </div>

      {/* ২. মেইন কন্টেন্ট গ্রিড */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        
        {/* বাম দিকের বড় অংশ (এজেন্সি টেবিল এবং ম্যাপ) */}
        <div className="xl:col-span-9 space-y-4">
          
          {/* টেবিল সেকশন */}
          <div className="bg-[#151921] p-4 rounded-[1.5rem] border border-white/5 shadow-2xl">
              <h3 className="text-[10px] font-black text-white/40 uppercase mb-3 tracking-widest px-2 flex justify-between">
                <span>Active_Agencies_Database</span>
                <span className="text-green-500/50">● System_Online</span>
              </h3>
              <MissionTable />
          </div>

          {/* ম্যাপ সেকশন (আলাদা কার্ডে রাখলে দেখতে সুন্দর লাগবে) */}
          <div className="bg-[#151921] p-2 rounded-[1.5rem] border border-white/5 shadow-2xl overflow-hidden h-[500px] relative">
              <LiveMap />
          </div>
        </div>

        {/* ডান দিকের অংশ (ইউজার প্রোফাইল/NID/Alerts) */}
        <div className="xl:col-span-3 h-full">
           <div className="bg-[#151921] h-full rounded-[1.5rem] border border-white/5 shadow-2xl overflow-hidden">
              <RealTimeAlerts />
           </div>
        </div>

      </div>
    </div>
  );
}