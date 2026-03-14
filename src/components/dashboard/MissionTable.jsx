import React from 'react';
import { Phone, Map, CheckCircle2, Package, ArrowUpFromLine, ArrowDownToLine } from 'lucide-react';

const MissionTable = () => {
  const missions = [
    { id: '#001', name: 'Chaldal', droneId: '1', status: 'Stand by', active: false },
    { id: '#002', name: 'Shovai bazar', droneId: '5', status: 'Flying', active: true },
    { id: '#003', name: 'Abaya', droneId: '9', status: 'Delivered', active: false },
  ];

  return (
    <div className="overflow-x-auto rounded-sm border border-slate-600">
      <table className="w-full text-left text-[11px] border-collapse bg-[#2d324a]">
        <thead>
          <tr className="text-slate-200">
            <th className="p-1.5 border-r border-b border-slate-600 font-medium">Bussiness ID</th>
            <th className="p-1.5 border-r border-b border-slate-600 font-medium">Business Name</th>
            <th className="p-1.5 border-r border-b border-slate-600 text-center font-medium">Call</th>
            <th className="p-1.5 border-r border-b border-slate-600 font-medium">Drone ID Assign</th>
            <th className="p-1.5 border-r border-b border-slate-600 text-center font-medium">Pick up</th>
            <th className="p-1.5 border-r border-b border-slate-600 text-center font-medium">Drop</th>
            <th className="p-1.5 border-r border-b border-slate-600 text-center font-medium">Map</th>
            <th className="p-1.5 border-r border-b border-slate-600 font-medium">Status</th>
            <th className="p-1.5 border-b border-slate-600 text-center font-medium">Complete</th>
          </tr>
        </thead>
        <tbody className="bg-[#d1d5db] text-black">
          {missions.map((m) => (
            <tr 
              key={m.id} 
              className={`border-b border-slate-400 ${m.active ? 'bg-[#f4a261]' : 'odd:bg-[#e5e7eb] even:bg-[#d1d5db]'}`}
            >
              <td className="p-1.5 border-r border-slate-400 font-semibold">{m.id}</td>
              <td className="p-1.5 border-r border-slate-400">{m.name}</td>
              
              <td className="p-1 border-r border-slate-400 text-center">
                <button className="p-1 inline-block">
                  <Phone size={14} className="fill-blue-600 text-blue-600" />
                </button>
              </td>

              <td className="p-1 border-r border-slate-400">
                <div className="flex gap-1 justify-center">
                  <input 
                    type="text" 
                    defaultValue={m.droneId}
                    className="w-12 h-6 border border-slate-400 rounded-sm px-1 text-center bg-white"
                  />
                  <button className="bg-[#3b82f6] text-white px-2 py-0.5 rounded-sm text-[10px] font-bold shadow-sm active:scale-95">OK</button>
                </div>
              </td>

              <td className="p-1 border-r border-slate-400 text-center">
                <button className="flex items-center gap-1 mx-auto bg-[#e5e7eb] border border-slate-500 px-2 py-0.5 rounded-sm shadow-sm hover:bg-white text-[10px] font-semibold">
                   <ArrowUpFromLine size={12} /> Pickup
                </button>
              </td>
              <td className="p-1 border-r border-slate-400 text-center">
                <button className="flex items-center gap-1 mx-auto bg-[#e5e7eb] border border-slate-500 px-2 py-0.5 rounded-sm shadow-sm hover:bg-white text-[10px] font-semibold">
                   <ArrowDownToLine size={12} /> Drop
                </button>
              </td>

              <td className="p-1 border-r border-slate-400 text-center">
                <button className="text-blue-800 hover:scale-110 transition-transform">
                   <Map size={16} fill="#3b82f6" fillOpacity={0.2} />
                </button>
              </td>

              <td className={`p-1.5 border-r border-slate-400 font-bold ${m.active ? 'text-white drop-shadow-sm' : 'text-slate-700'}`}>
                {m.status}
              </td>

              <td className="p-1 text-center">
                <button className={`flex items-center gap-1 mx-auto px-2 py-1 rounded-sm text-white text-[10px] font-bold shadow-md active:scale-95 ${m.status === 'Delivered' ? 'bg-[#059669]' : 'bg-[#374151]'}`}>
                  <CheckCircle2 size={12} /> {m.status === 'Delivered' ? 'Complete' : 'End'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionTable;