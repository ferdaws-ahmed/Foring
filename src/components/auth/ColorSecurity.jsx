"use client";
import { useState, useEffect } from "react";

const COLORS = [
  { id: 1, hex: "#ef4444" }, { id: 2, hex: "#3b82f6" }, { id: 3, hex: "#eab308" },
  { id: 4, hex: "#22c55e" }, { id: 5, hex: "#a855f7" }, { id: 6, hex: "#ec4899" },
  { id: 7, hex: "#06b6d4" }, { id: 8, hex: "#f97316" }, { id: 9, hex: "#64748b" },
  { id: 10, hex: "#10b981" }, { id: 11, hex: "#6366f1" }, { id: 12, hex: "#f43f5e" },
  { id: 13, hex: "#8b5cf6" }, { id: 14, hex: "#2dd4bf" }, { id: 15, hex: "#fbbf24" },
  { id: 16, hex: "#475569" }, { id: 17, hex: "#be123c" }, { id: 18, hex: "#1e40af" },
  { id: 19, hex: "#15803d" }, { id: 20, hex: "#7c3aed" }
];

export default function ColorGridSecurity({ onSuccess, onFail }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    if (timeLeft === 0) {
      onFail();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onFail]);

  const handleColorClick = (id) => {
    // আগের মতো সাথে সাথে চেক না করে শুধু আইডি কালেক্ট করবো
    const nextSequence = [...selectedIds, id];
    setSelectedIds(nextSequence);

    if (nextSequence.length === 5) {
      // ৫টি ক্লিক শেষ হলে এই কমা-সেপারেটেড স্ট্রিংটি সাকসেস ফাংশনে পাঠাবো
      onSuccess(nextSequence.join(",")); 
    }
  };

  return (
    <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] text-red-500 font-black animate-pulse">
            TIME_REMAINING: {timeLeft}S
          </span>
          <span className="text-[10px] text-yellow-500 font-black">
            SEQUENCE: {selectedIds.length} / 5
          </span>
        </div>
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] italic">
          Tactical Grid Override
        </h3>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest">
          Input 5-Step Hardware Color Key
        </p>
      </div>

      <div className="grid grid-cols-5 gap-3 py-4">
        {COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => handleColorClick(color.id)}
            // ইউজারকে বুঝতে না দেওয়ার জন্য সব বাটনে একই ইফেক্ট
            className="w-full aspect-square rounded-lg border border-white/5 hover:scale-105 active:scale-95 transition-all shadow-lg"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>

      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full ${i < selectedIds.length ? 'bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
}