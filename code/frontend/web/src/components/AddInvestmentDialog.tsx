import { useState } from "react";
import { Investment } from "@/data/investments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AddInvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (investment: Investment) => void;
}

const AddInvestmentDialog = ({ open, onOpenChange, onAdd }: AddInvestmentDialogProps) => {
  const [type, setType] = useState<Investment["type"]>("acao");
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [date, setDate] = useState<Date>();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [otherCosts, setOtherCosts] = useState("");

  const qty = parseFloat(quantity) || 0;
  const prc = parseFloat(price) || 0;
  const costs = parseFloat(otherCosts) || 0;
  const totalValue = qty * prc + costs;

  const resetForm = () => {
    setType("acao");
    setName("");
    setTicker("");
    setDate(undefined);
    setQuantity("");
    setPrice("");
    setOtherCosts("");
  };

  const handleSubmit = () => {
    if (!name.trim() || !ticker.trim() || qty <= 0 || prc <= 0) return;

    const investment: Investment = {
      id: crypto.randomUUID(),
      name: name.trim(),
      ticker: ticker.trim().toUpperCase(),
      type,
      currentValue: totalValue,
      investedValue: totalValue,
      quantity: qty,
      averagePrice: prc,
    };

    onAdd(investment);
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-none border-border">
        <DialogHeader>
          <DialogTitle className="font-display tracking-tight text-lg">NOVO ATIVO</DialogTitle>
          <DialogDescription className="text-xs font-mono tracking-wider text-muted-foreground">
            Adicione um novo ativo à sua carteira
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Tipo */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">TIPO DE ATIVO</Label>
            <Select value={type} onValueChange={(v) => setType(v as Investment["type"])}>
              <SelectTrigger className="rounded-none font-mono text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="acao">Ação</SelectItem>
                <SelectItem value="fii">FII</SelectItem>
                <SelectItem value="renda-fixa">Renda Fixa</SelectItem>
                <SelectItem value="cripto">Cripto</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ativo (nome + ticker) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">NOME</Label>
              <Input
                className="rounded-none font-mono text-sm"
                placeholder="Ex: Petrobras"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">TICKER</Label>
              <Input
                className="rounded-none font-mono text-sm uppercase"
                placeholder="Ex: PETR4"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              />
            </div>
          </div>

          {/* Data da compra */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">DATA DA COMPRA</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-mono text-sm rounded-none",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-none" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d > new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Quantidade + Preço */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">QUANTIDADE</Label>
              <Input
                className="rounded-none font-mono text-sm"
                type="number"
                min="0"
                step="any"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">PREÇO (R$)</Label>
              <Input
                className="rounded-none font-mono text-sm"
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Outros custos */}
          <div className="space-y-1.5">
            <Label className="text-[10px] font-mono tracking-widest text-muted-foreground">OUTROS CUSTOS (R$)</Label>
            <Input
              className="rounded-none font-mono text-sm"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={otherCosts}
              onChange={(e) => setOtherCosts(e.target.value)}
            />
          </div>

          {/* Valor final calculado */}
          <div className="border-t border-border pt-4 flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-muted-foreground">VALOR TOTAL</span>
            <span className="text-lg font-display font-bold">
              {totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>

          <Button
            className="w-full rounded-none font-mono text-xs tracking-wider"
            onClick={handleSubmit}
            disabled={!name.trim() || !ticker.trim() || qty <= 0 || prc <= 0}
          >
            ADICIONAR ATIVO
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvestmentDialog;
