"use client";
import { useState, useEffect } from "react";

export default function MasterKeyModal({ onConfirm, onFail }) {
  const [inputKey, setInputKey] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [glitchText, setGlitchText] = useState("ENCRYPTED_GATE");

  // ৩০ সেকেন্ডের ডেডলাইন
  useEffect(() => {
    if (timeLeft === 0) {
      onFail(); 
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onFail]);

  // হ্যাকারের মাথা ঘুরানোর জন্য র‍্যান্ডম টেক্সট এফেক্ট
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const interval = setInterval(() => {
      let randomStr = "";
      for(let i=0; i<14; i++) randomStr += chars[Math.floor(Math.random() * chars.length)];
      setGlitchText(randomStr);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative space-y-6 p-6 border-2 border-red-500/20 bg-red-500/5 rounded-2xl animate-pulse">
      <div className="text-center space-y-2">
        <h2 className="text-xs font-black text-red-500 tracking-[0.5em] uppercase">
          Final Defense Layer
        </h2>
        <div className="font-mono text-xl text-red-600/50 select-none opacity-50">
          {glitchText}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-bold">
          <span className="text-red-500">SYS_TEMP: 98°C</span>
          <span className="text-white/40 italic">ATTEMPT: 01/01</span>
        </div>
        
        <input 
          type="password"
          autoFocus
          placeholder="ENTER MASTER KEY"
          className="w-full bg-black border-b-2 border-red-600 p-4 text-center text-red-500 text-lg outline-none placeholder:text-red-900/50 tracking-[0.3em]"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />

        <div className="relative h-1 bg-white/5 w-full overflow-hidden">
          <div 
            className="absolute h-full bg-red-600 transition-all duration-1000"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
      </div>

      <button 
        onClick={() => onConfirm(inputKey)}
        className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs tracking-widest transition-all active:scale-95"
      >
        EXECUTE OVERRIDE ({timeLeft}s)
      </button>

      <div className="text-[8px] text-white/20 text-center uppercase">
        Warning: Unauthorized access will trigger terminal lockdown.
      </div>
    </div>
  );
}