"use client";
export default function ControlCenter() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-[2.5rem]">
        <h3 className="text-[10px] font-black text-yellow-500/60 uppercase tracking-widest mb-6">Mission_Commands</h3>
        <div className="grid grid-cols-1 gap-3">
          <button className="w-full py-4 bg-yellow-500 text-black font-black text-xs rounded-2xl uppercase hover:scale-[1.02] active:scale-95 transition-all">Launch_Drone</button>
          <button className="w-full py-4 bg-white/5 text-white font-black text-xs rounded-2xl uppercase hover:bg-white/10 transition-all">Return_Home</button>
          <button className="w-full py-4 border border-red-500/20 text-red-500 font-black text-xs rounded-2xl uppercase hover:bg-red-500 hover:text-white transition-all">Emergency_Kill</button>
        </div>
      </div>

      <div className="bg-[#0f0f0f] border border-white/5 p-6 rounded-[2.5rem] h-[200px] overflow-y-auto">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Activity_Logs</h3>
        <div className="space-y-3 font-mono text-[9px]">
          <p className="text-green-500/70">{`> AUTH_SUCCESS: OPERATOR_READY`}</p>
          <p className="text-white/30">{`> LINK_ESTABLISHED: SATELLITE_7`}</p>
          <p className="text-yellow-500/70">{`> STATUS: STANDBY_MODE`}</p>
        </div>
      </div>
    </div>
  );
}