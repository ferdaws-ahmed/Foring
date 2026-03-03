"use client";

export default function Logo() {
  return (
    <div className="flex items-center gap-4 select-none group cursor-pointer py-2">
      {/* 🛸 Hyper-Realistic In-Flight Drone Unit */}
      <div className="relative w-16 h-14 flex items-center justify-center transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-1">
        
        {/* 🌑 Ground Shadow - একটু লাইট করা হয়েছে */}
        <div className="absolute -bottom-2.5 w-10 h-1.5 bg-black/30 blur-md rounded-full scale-x-125 opacity-30 group-hover:scale-x-100 transition-transform"></div>

        {/* --- Main Drone Structure --- */}
        <div className="relative transform -rotate-[12deg] transition-transform duration-500 group-hover:-rotate-[18deg]">
          
          <svg viewBox="0 0 64 64" className="w-16 h-16 drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
            {/* 1. Carbon Fiber Frame Arms (এখন গাঢ় ধূসর, নট ব্ল্যাক) */}
            <g id="Arms" stroke="#333" strokeWidth="4" strokeLinecap="round">
              <path d="M32 32 L12 12" /> 
              <path d="M32 32 L52 12" /> 
              <path d="M32 32 L15 52" /> 
              <path d="M32 32 L49 52" /> 
            </g>

            {/* 2. Central Engine Module - Light Color Update */}
            <defs>
              <linearGradient id="bodyGradRealLight" x1="0%" y1="0%" x2="100%" y2="100%">
                {/* 🎨 Light Matte White / Aluminium Gradient */}
                <stop offset="0%" stopColor="#f8fafc" /> {/* Slate-50 */}
                <stop offset="100%" stopColor="#cbd5e1" /> {/* Slate-300 */}
              </linearGradient>
            </defs>
            
            {/* বডির মেইন শেপ - Light White with Dark Grey Stroke */}
            <path 
              d="M22 28 Q32 20 42 28 L40 40 Q32 46 24 40 Z" 
              fill="url(#bodyGradRealLight)" 
              stroke="#64748b" // Slate-500
              strokeWidth="0.8" 
            />
            
            {/* বডির ওপরের হলুদ হাইলাইট এবং ডিটেইলস */}
            <path d="M28 32 H36 M27 35 H37" stroke="#eab308" strokeWidth="0.5" opacity="0.6" />

            {/* ৩. Beacon Light (হলুদ সিগন্যাল লাইট) */}
            <circle cx="32" cy="28" r="1.2" fill="#eab308">
              <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* ৪. Delivery Payload (বক্স - একটু লাইট ব্রাউন) */}
            <rect x="28" y="39" width="8" height="7" fill="#854d0e" rx="1" transform="rotate(3 32 42.5)" stroke="#64748b" strokeWidth="0.3" />
            <path d="M28 42 H36" stroke="#fbbf24" strokeWidth="0.2" opacity="0.4" />
          </svg>

          {/* ⚡ REALISTIC ROTATING BLADES (SVG Blades) ⚡ */}
          
          {/* Front Left Blade */}
          <div className="absolute top-[3px] left-[3px] w-8 h-8 flex items-center justify-center animate-[spin_0.8s_linear_infinite] origin-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/50">
              <path d="M12 11.5 L2 12 L12 12.5 Z M12 11.5 L22 12 L12 12.5 Z" />
            </svg>
          </div>
          
          {/* Front Right Blade */}
          <div className="absolute top-[3px] right-[3px] w-8 h-8 flex items-center justify-center animate-[spin_0.8s_linear_infinite] origin-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/50">
              <path d="M12 11.5 L2 12 L12 12.5 Z M12 11.5 L22 12 L12 12.5 Z" />
            </svg>
          </div>
          
          {/* Back Left Blade */}
          <div className="absolute bottom-[2px] left-[0px] w-8 h-8 flex items-center justify-center animate-[spin_1.2s_linear_infinite] origin-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/40">
              <path d="M12 11.5 L2 12 L12 12.5 Z M12 11.5 L22 12 L12 12.5 Z" />
            </svg>
          </div>
          
          {/* Back Right Blade */}
          <div className="absolute bottom-[2px] right-[0px] w-8 h-8 flex items-center justify-center animate-[spin_1.2s_linear_infinite] origin-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/40">
              <path d="M12 11.5 L2 12 L12 12.5 Z M12 11.5 L22 12 L12 12.5 Z" />
            </svg>
          </div>
          
        </div>
      </div>

      {/* --- Brand Identity --- */}
      <div className="flex flex-col ml-1">
        <h1 className="text-2xl font-black text-white italic tracking-tighter leading-none group-hover:text-yellow-500 transition-colors uppercase">
          Foring<span className="text-yellow-500 font-mono not-italic font-normal">.</span>
        </h1>
        <div className="flex items-center gap-2 mt-1.5 border-t border-white/5 pt-1.5">
          {/* Status Bars */}
          <div className="flex gap-[2px]">
            <span className="w-1.5 h-3 bg-yellow-500 rounded-sm"></span>
            <span className="w-1.5 h-3 bg-yellow-500/50 rounded-sm"></span>
            <span className="w-1.5 h-3 bg-yellow-500/10 rounded-sm animate-pulse"></span>
          </div>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            UAV_Logistics
          </span>
        </div>
      </div>
    </div>
  );
}