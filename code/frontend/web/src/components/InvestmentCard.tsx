import { useState } from "react";
import { Investment, typeLabels } from "@/data/investments";
import { TrendingUp, TrendingDown, Eye, EyeOff, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvestmentCardProps {
  investment: Investment;
  totalPortfolioValue: number;
  onDelete: (id: string) => void;
}

const InvestmentCard = ({ investment, totalPortfolioValue, onDelete }: InvestmentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const profit = investment.currentValue - investment.investedValue;
  const profitPercent = ((profit / investment.investedValue) * 100);
  const isPositive = profit >= 0;
  const allocation = ((investment.currentValue / totalPortfolioValue) * 100);

  return (
    <div className="border border-border bg-card group hover:border-foreground transition-colors duration-200">
      {/* Header */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-display font-bold tracking-tight">{investment.ticker}</span>
            <span className="text-[10px] font-mono tracking-wider border border-border px-1.5 py-0.5 text-muted-foreground">
              {typeLabels[investment.type].toUpperCase()}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{investment.name}</span>
        </div>

        <div className="flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
          <span className={`text-sm font-mono font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
            {isPositive ? "+" : ""}{profitPercent.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Values */}
      <div className="px-4 pb-3 grid grid-cols-2 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-wider text-muted-foreground">VALOR ATUAL</span>
          <p className="text-base font-semibold font-display">
            {investment.currentValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-wider text-muted-foreground">ALOCAÇÃO</span>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-secondary">
              <div className="h-full bg-foreground transition-all duration-500" style={{ width: `${allocation}%` }} />
            </div>
            <span className="text-xs font-mono font-medium">{allocation.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      {showDetails && (
        <div className="px-4 pb-3 grid grid-cols-3 gap-3 border-t border-border pt-3">
          <div>
            <span className="text-[10px] font-mono tracking-wider text-muted-foreground">INVESTIDO</span>
            <p className="text-sm font-mono">
              {investment.investedValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-muted-foreground">LUCRO/PREJ.</span>
            <p className={`text-sm font-mono font-semibold ${isPositive ? "text-success" : "text-destructive"}`}>
              {isPositive ? "+" : ""}{profit.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-muted-foreground">PM</span>
            <p className="text-sm font-mono">
              {investment.averagePrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 rounded-none h-10 text-xs font-mono tracking-wider hover:bg-secondary"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? <EyeOff className="h-3.5 w-3.5 mr-2" /> : <Eye className="h-3.5 w-3.5 mr-2" />}
          {showDetails ? "OCULTAR" : "DETALHES"}
        </Button>
        <div className="w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 rounded-none h-10 text-xs font-mono tracking-wider hover:bg-secondary"
        >
          <Edit3 className="h-3.5 w-3.5 mr-2" />
          EDITAR
        </Button>
        <div className="w-px bg-border" />
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 rounded-none h-10 text-xs font-mono tracking-wider hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => onDelete(investment.id)}
        >
          <Trash2 className="h-3.5 w-3.5 mr-2" />
          REMOVER
        </Button>
      </div>
    </div>
  );
};

export default InvestmentCard;
