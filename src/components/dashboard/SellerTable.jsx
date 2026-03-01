export default function SellerTable({ role }) {
  const missions = [
    { id: "M-902", seller: "Karim Super Shop", location: "Mirpur 10", status: "Calling", time: "2m ago" },
    { id: "M-901", seller: "Lazz Pharma", location: "Banani", status: "In-Queue", time: "5m ago" },
  ];

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/80 text-[10px] font-bold uppercase text-slate-500 tracking-widest">
            <th className="p-5">ID</th>
            <th className="p-5">Seller / Location</th>
            <th className="p-5">Current Status</th>
            <th className="p-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {missions.map((m) => (
            <tr key={m.id} className="hover:bg-slate-800/30 transition group">
              <td className="p-5 font-mono text-xs text-slate-500">#{m.id}</td>
              <td className="p-5">
                <div className="font-bold text-slate-200">{m.seller}</div>
                <div className="text-[10px] text-slate-500 uppercase">{m.location}</div>
              </td>
              <td className="p-5">
                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${m.status === 'Calling' ? 'bg-yellow-500/10 text-yellow-500 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
                  {m.status}
                </span>
              </td>
              <td className="p-5 text-right">
                <button className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${role === 'admin' ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
                  {role === 'admin' ? 'Deploy Drone' : 'Locked'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}