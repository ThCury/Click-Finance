import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";

interface SummaryCardsProps {
  totalValue: number;
  totalInvested: number;
  totalProfit: number;
  profitPercent: number;
}

const PortfolioSummary = ({ totalValue, totalInvested, totalProfit, profitPercent }: SummaryCardsProps) => {
  const isPositive = totalProfit >= 0;

  const cards = [
    {
      label: "PATRIMÔNIO TOTAL",
      value: totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      icon: DollarSign,
    },
    {
      label: "TOTAL INVESTIDO",
      value: totalInvested.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      icon: BarChart3,
    },
    {
      label: "RENTABILIDADE",
      value: totalProfit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      suffix: `${isPositive ? "+" : ""}${profitPercent.toFixed(2)}%`,
      icon: isPositive ? TrendingUp : TrendingDown,
      highlight: true,
      isPositive,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
      {cards.map((card) => (
        <div key={card.label} className="bg-card p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest text-muted-foreground">{card.label}</span>
            <card.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-2xl font-display font-bold tracking-tight">{card.value}</span>
            {card.suffix && (
              <span className={`text-sm font-mono font-semibold pb-0.5 ${card.isPositive ? "text-success" : "text-destructive"}`}>
                {card.suffix}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioSummary;
