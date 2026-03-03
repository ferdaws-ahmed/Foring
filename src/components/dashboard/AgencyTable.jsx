export default function AgencyTable() {
  const agencies = [
    { id: "AG-01", name: "Fire Service", activeDrones: 4, area: "Dhaka North", status: "Operational" },
    { id: "AG-02", name: "Border Guard", activeDrones: 8, area: "Sylhet Border", status: "Busy" },
    { id: "AG-03", name: "Police HQ", activeDrones: 2, area: "Chattogram", status: "Maintenance" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-[10px] uppercase text-slate-500 tracking-widest">
            <th className="pb-4 pl-4">Agency_ID</th>
            <th className="pb-4">Name</th>
            <th className="pb-4">Active_UAV</th>
            <th className="pb-4">Sector</th>
            <th className="pb-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-[11px] font-bold">
          {agencies.map((agency, i) => (
            <tr key={i} className="bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
              <td className="py-4 pl-4 rounded-l-2xl border-l border-white/5">{agency.id}</td>
              <td className="py-4 text-white uppercase italic">{agency.name}</td>
              <td className="py-4 text-yellow-500">{agency.activeDrones} Units</td>
              <td className="py-4 text-slate-400">{agency.area}</td>
              <td className="py-4 rounded-r-2xl border-r border-white/5">
                <span className={`px-3 py-1 rounded-full text-[8px] uppercase ${
                  agency.status === 'Operational' ? 'bg-green-500/10 text-green-500' : 
                  agency.status === 'Busy' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {agency.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}