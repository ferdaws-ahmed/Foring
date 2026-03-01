"use client";
import { useState } from "react";

export default function AssignDroneModal({ isOpen, onVerify, type }) {
  const [pin, setPin] = useState("");

  if (!isOpen) return null;

  if (type === "security") {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[999] p-6">
        <div className="max-w-sm w-full bg-slate-900 border border-red-900/30 p-10 rounded-[2rem] text-center shadow-[0_0_100px_rgba(220,38,38,0.1)]">
          <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-600/20">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-white font-black text-xl uppercase tracking-tighter mb-2">Security Verification</h2>
          <p className="text-slate-500 text-xs mb-8 uppercase tracking-widest font-bold">Admin Master Pin Required</p>
          
          <input 
            type="password" 
            maxLength={4}
            className="w-full bg-black border border-slate-800 p-4 text-center text-4xl tracking-[0.8em] rounded-2xl mb-8 text-red-500 outline-none focus:border-red-600 shadow-inner"
            onChange={(e) => setPin(e.target.value)}
            autoFocus
          />
          
          <button 
            onClick={() => pin === "1234" ? onVerify() : alert("ACCESS DENIED")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-red-900/40 active:scale-95"
          >
            AUTHORIZE MISSION
          </button>
        </div>
      </div>
    );
  }

  return null;
}