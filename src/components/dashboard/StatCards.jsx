export default function StatCards({ role }) {
  const stats = [
    { label: "Active Fleet", value: "08", desc: "Drones in air", color: "text-cyan-400" },
    { label: "Pending Calls", value: "03", desc: "Sellers waiting", color: "text-yellow-500" },
    { label: "System Uptime", value: "99.9%", desc: "Stable connection", color: "text-green-500" },
    { label: "Alerts", value: "00", desc: "Critical issues", color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, i) => (
        <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 group-hover:text-slate-300">{item.label}</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-black font-mono ${item.color}`}>{item.value}</span>
            <span className="text-[10px] text-slate-600 font-medium">{item.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}