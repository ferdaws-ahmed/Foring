"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StatCards from "./StatCards";
import SellerTable from "./SellerTable";
import AssignDroneModal from "./AssignDroneModal";

export default function DashboardContainer() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-yellow-500 font-mono">INITIALIZING SYSTEM...</div>;
  if (!session) return null;

  const role = session.user.role;

  // অ্যাডমিন সিকিউরিটি লেয়ার
  if (role === "admin" && !isAdminVerified) {
    return <AssignDroneModal type="security" onVerify={() => setIsAdminVerified(true)} isOpen={true} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
              {role === "admin" ? "Master Control Tower" : "Operator Panel"}
            </h1>
            <p className="text-slate-500 text-sm font-medium">Welcome back, Operator {session.user.name}</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 p-2 rounded-xl">
             <div className={`w-3 h-3 rounded-full animate-pulse ${role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
             <span className="text-[10px] font-bold uppercase tracking-widest">{role} session active</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <StatCards role={role} />
        
        <div className="grid grid-cols-1 gap-8 mt-10">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Live Mission Logs</h2>
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500">REAL-TIME UPDATING</span>
            </div>
            <SellerTable role={role} />
          </section>
        </div>
      </div>
    </div>
  );
}