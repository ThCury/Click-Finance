import { useState } from "react";
import { mockInvestments, Investment } from "@/data/investments";
import PortfolioSummary from "@/components/PortfolioSummary";
import AllocationChart from "@/components/AllocationChart";
import InvestmentCard from "@/components/InvestmentCard";
import AddInvestmentDialog from "@/components/AddInvestmentDialog";
import { Plus, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [investments, setInvestments] = useState<Investment[]>(mockInvestments);
  const [sortBy, setSortBy] = useState<"value" | "profit" | "allocation">("value");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = (inv: Investment) => {
    setInvestments((prev) => [...prev, inv]);
  };

  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.investedValue, 0);
  const totalProfit = totalValue - totalInvested;
  const profitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  const handleDelete = (id: string) => {
    setInvestments((prev) => prev.filter((inv) => inv.id !== id));
  };

  const sorted = [...investments].sort((a, b) => {
    if (sortBy === "value") return b.currentValue - a.currentValue;
    if (sortBy === "profit") {
      const pa = (a.currentValue - a.investedValue) / a.investedValue;
      const pb = (b.currentValue - b.investedValue) / b.investedValue;
      return pb - pa;
    }
    return (b.currentValue / totalValue) - (a.currentValue / totalValue);
  });

  const sortLabels = { value: "VALOR", profit: "RENTAB.", allocation: "ALOCAÇÃO" };
  const nextSort = { value: "profit" as const, profit: "allocation" as const, allocation: "value" as const };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight">CARTEIRA</h1>
          <p className="text-xs font-mono text-muted-foreground tracking-wider mt-1">
            {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).toUpperCase()}
          </p>
        </div>
        <Button variant="default" size="sm" className="font-mono text-xs tracking-wider rounded-none" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          NOVO ATIVO
        </Button>
      </div>

      <div className="space-y-8">
        <PortfolioSummary
          totalValue={totalValue}
          totalInvested={totalInvested}
          totalProfit={totalProfit}
          profitPercent={profitPercent}
        />

        <AllocationChart investments={investments} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-mono tracking-widest text-muted-foreground">
              ATIVOS ({investments.length})
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="font-mono text-xs tracking-wider rounded-none"
              onClick={() => setSortBy(nextSort[sortBy])}
            >
              <ArrowUpDown className="h-3.5 w-3.5 mr-2" />
              {sortLabels[sortBy]}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {sorted.map((inv) => (
              <InvestmentCard
                key={inv.id}
                investment={inv}
                totalPortfolioValue={totalValue}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      <AddInvestmentDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAdd} />
    </div>
  );
};

export default Index;
