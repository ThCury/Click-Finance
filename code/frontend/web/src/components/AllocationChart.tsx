import { Investment, typeLabels } from "@/data/investments";

interface AllocationChartProps {
  investments: Investment[];
}

const AllocationChart = ({ investments }: AllocationChartProps) => {
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);

  // Group by type
  const byType = investments.reduce((acc, inv) => {
    acc[inv.type] = (acc[inv.type] || 0) + inv.currentValue;
    return acc;
  }, {} as Record<string, number>);

  const segments = Object.entries(byType)
    .map(([type, value]) => ({
      type: type as Investment["type"],
      value,
      percent: (value / totalValue) * 100,
    }))
    .sort((a, b) => b.percent - a.percent);

  // Monochrome shades
  const shades = ["bg-foreground", "bg-foreground/80", "bg-foreground/60", "bg-foreground/40", "bg-foreground/20", "bg-foreground/10"];

  return (
    <div className="border border-border bg-card p-6">
      <h2 className="text-xs font-mono tracking-widest text-muted-foreground mb-6">ALOCAÇÃO POR TIPO</h2>

      {/* Bar */}
      <div className="flex h-8 w-full overflow-hidden border border-border mb-6">
        {segments.map((seg, i) => (
          <div
            key={seg.type}
            className={`${shades[i % shades.length]} transition-all duration-500 relative group`}
            style={{ width: `${seg.percent}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono font-bold text-primary-foreground mix-blend-difference">
                {seg.percent.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {segments.map((seg, i) => (
          <div key={seg.type} className="flex items-center gap-3 group cursor-default">
            <div className={`w-3 h-3 ${shades[i % shades.length]} border border-border flex-shrink-0`} />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{typeLabels[seg.type]}</span>
              <span className="text-xs font-mono text-muted-foreground">
                {seg.percent.toFixed(1)}% · {seg.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationChart;
