"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then((m) => m.Polyline), { ssr: false });

const LiveMap = () => {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);

  const source = [23.8103, 90.4125];
  const destination = [23.8180, 90.4250];
  const [currentPos, setCurrentPos] = useState(source);
  
  // ডাইনামিক ডেটা স্টেট
  const [timeLeft, setTimeLeft] = useState(240); // ৪ মিনিট = ২৪০ সেকেন্ড
  const [stats, setStats] = useState({ battery: 92, fuel: 85, altitude: 120 });

  useEffect(() => {
    setIsClient(true);
    import('leaflet').then((leaflet) => setL(leaflet));

    let step = 0;
    const numSteps = 1000; // মুভমেন্ট আরও স্মুথ করতে স্টেপ বাড়ানো হলো

    const interval = setInterval(() => {
      if (step <= numSteps) {
        const lat = source[0] + (destination[0] - source[0]) * (step / numSteps);
        const lng = source[1] + (destination[1] - source[1]) * (step / numSteps);
        setCurrentPos([lat, lng]);
        
        // টাইম, ব্যাটারি এবং অল্টিটিউড সিমুলেশন
        if (step % 4 === 0) setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        if (step % 100 === 0) setStats(prev => ({ 
            battery: prev.battery - 1, 
            fuel: prev.fuel - 1,
            altitude: prev.altitude + (Math.random() > 0.5 ? 1 : -1) // অল্টিটিউড হালকা পরিবর্তন
        }));
        
        step++;
      } else {
        step = 0;
        setTimeLeft(240);
        setStats({ battery: 92, fuel: 85, altitude: 120 });
      }
    }, 50); 

    return () => clearInterval(interval);
  }, []);

  // সেকেন্ডকে মিনিটে কনভার্ট করার ফাংশন
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // উচ্চ-মানের বাস্তবিক ড্রোন ডিজাইন (SVG + CSS 3D & Animation)
  const getDroneIcon = () => {
    if (!L) return null;
    return new L.DivIcon({
      className: 'drone-real-pro',
      html: `
        <div class="drone-real-container">
          <style>
            .drone-real-container { position: relative; width: 60px; height: 60px; perspective: 1000px; transform-style: preserve-3d; }
            
            /* ড্রোন বডি - মেটালিক টেক্সচার ও 3D লুক */
            .drone-body-real {
              position: absolute; top: 50%; left: 50%;
              width: 16px; height: 26px;
              background: linear-gradient(135deg, #4b5563 0%, #111827 100%); /* মেটালিক গ্রেডিয়েন্ট */
              border: 1.5px solid #6b7280;
              border-radius: 4px; transform: translate(-50%, -50%) rotateX(15deg);
              z-index: 20; box-shadow: 0 4px 10px rgba(0,0,0,0.7);
            }
            
            /* ইন্ডিকেটর লাইট */
            .drone-body-real::before { content: ''; position: absolute; top: 1px; left: 50%; transform: translateX(-50%); width: 3px; height: 3px; background: red; border-radius: 50%; box-shadow: 0 0 4px red; animation: blink 0.5s infinite; }
            .drone-body-real::after { content: ''; position: absolute; bottom: 1px; left: 50%; transform: translateX(-50%); width: 3px; height: 3px; background: blue; border-radius: 50%; box-shadow: 0 0 4px blue; animation: blink 1s infinite; }

            /* ড্রোন আর্মস */
            .drone-arm-real {
              position: absolute; top: 50%; left: 50%;
              width: 48px; height: 3px; background: #334155;
              transform-origin: center; z-index: 10;
            }
            .arm-1 { transform: translate(-50%, -50%) rotate(45deg); }
            .arm-2 { transform: translate(-50%, -50%) rotate(-45deg); }
            
            /* মোটরস */
            .motor-real {
              position: absolute; width: 10px; height: 10px;
              background: #000; border-radius: 50%; border: 1.5px solid #444;
            }
            .m1 { top: -5px; left: -5px; } .m2 { top: -5px; right: -5px; }
            .m3 { bottom: -5px; left: -5px; } .m4 { bottom: -5px; right: -5px; }

            /* প্রপেলার অ্যানিমেশন - উচ্চ স্পিডে ব্লার ইফেক্ট */
            .prop-real {
              position: absolute; top: 50%; left: 50%;
              width: 26px; height: 14px; /* ডিম্বাকার ব্লার ইফেক্ট */
              background: rgba(255,255,255,0.05); border-radius: 50%;
              border: 1px dashed rgba(255,255,255,0.2);
              transform: translate(-50%, -50%);
              animation: spinPropBlur 0.04s linear infinite; /* অত্যন্ত দ্রুত রোটেশন */
            }
            
            @keyframes spinPropBlur { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
            
            /* ড্রোন শ্যাডো (Depth/গভীরতা তৈরির জন্য) */
            .drone-shadow {
              position: absolute; top: 60%; left: 50%;
              width: 30px; height: 15px; background: rgba(0,0,0,0.2);
              border-radius: 50%; transform: translate(-50%, -50%);
              filter: blur(5px); z-index: 5;
            }

          </style>
          
          <div class="drone-shadow"></div>
          <div class="drone-arm-real arm-1"></div>
          <div class="drone-arm-real arm-2"></div>
          <div class="drone-body-real">
             <div class="motor-real m1"><div class="prop-real"></div></div>
             <div class="motor-real m2"><div class="prop-real"></div></div>
             <div class="motor-real m3"><div class="prop-real"></div></div>
             <div class="motor-real m4"><div class="prop-real"></div></div>
          </div>
        </div>
      `,
      iconSize: [60, 60],
      iconAnchor: [30, 30]
    });
  };

  if (!isClient || !L) return <div className="h-full w-full bg-[#0b0e14] animate-pulse rounded-3xl" />;

  return (
    <div className="relative w-full h-full min-h-[450px] rounded-[2rem] overflow-hidden border border-white/5 shadow-inner">
      {/* লাইভ ট্র্যাকিং বক্স - ডিজাইন ঠিক রেখে ডেটা বসানো হলো */}
      <div className="absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-gray-200 w-[260px] font-sans">
        <div className="flex justify-between items-start mb-3">
           <div>
              <h4 className="text-[11px] font-black text-black uppercase tracking-tight">Mission_Tracking: DR-05</h4>
              <p className="text-[9px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> IN_TRANSIT
              </p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black text-black uppercase">ETA</p>
              <p className="text-[10px] text-orange-600 font-mono font-bold">{formatTime(timeLeft)}</p>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3 border-y border-gray-100 py-2">
           <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase">Latitude</p>
              <p className="text-[10px] text-black font-mono">{currentPos[0].toFixed(5)}</p>
           </div>
           <div>
              <p className="text-[8px] text-gray-400 font-bold uppercase">Longitude</p>
              <p className="text-[10px] text-black font-mono">{currentPos[1].toFixed(5)}</p>
           </div>
        </div>

        <div className="space-y-2">
           <div>
              <div className="flex justify-between text-[9px] font-bold mb-1">
                 <span className="text-gray-500 uppercase italic">Battery_Level</span>
                 <span className={stats.battery < 20 ? 'text-red-500' : 'text-black'}>{stats.battery}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                 <div className="bg-black h-full transition-all duration-500" style={{ width: `${stats.battery}%` }}></div>
              </div>
           </div>
           <div>
              <div className="flex justify-between text-[9px] font-bold mb-1">
                 <span className="text-gray-500 uppercase italic">Fuel_Reserve</span>
                 <span className="text-black">{stats.fuel}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                 <div className="bg-orange-500 h-full transition-all duration-500" style={{ width: `${stats.fuel}%` }}></div>
              </div>
           </div>
           <div>
              <p className="text-[9px] text-gray-400 uppercase mt-1">Altitude: <span className="text-black font-bold font-mono">{stats.altitude}M</span></p>
           </div>
        </div>
      </div>

      <MapContainer center={source} zoom={16} className="h-full w-full" zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="grayscale brightness-90 contrast-125" />
        <Polyline positions={[source, destination]} color="#ffffff" weight={1} dashArray="5, 10" opacity={0.3} />
        <Polyline positions={[source, currentPos]} color="#f97316" weight={3} />
        <Marker position={currentPos} icon={getDroneIcon()} />
      </MapContainer>
    </div>
  );
};

export default LiveMap;