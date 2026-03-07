export interface Investment {
  id: string;
  name: string;
  ticker: string;
  type: "acao" | "fii" | "renda-fixa" | "cripto" | "etf";
  currentValue: number;
  investedValue: number;
  quantity: number;
  averagePrice: number;
}

export const mockInvestments: Investment[] = [
  { id: "1", name: "Petrobras", ticker: "PETR4", type: "acao", currentValue: 12500, investedValue: 10000, quantity: 500, averagePrice: 20 },
  { id: "2", name: "Vale", ticker: "VALE3", type: "acao", currentValue: 8200, investedValue: 9000, quantity: 150, averagePrice: 60 },
  { id: "3", name: "MXRF11", ticker: "MXRF11", type: "fii", currentValue: 5600, investedValue: 5000, quantity: 500, averagePrice: 10 },
  { id: "4", name: "Tesouro Selic 2029", ticker: "SELIC29", type: "renda-fixa", currentValue: 15200, investedValue: 14000, quantity: 1, averagePrice: 14000 },
  { id: "5", name: "Bitcoin", ticker: "BTC", type: "cripto", currentValue: 6800, investedValue: 5500, quantity: 0.02, averagePrice: 275000 },
  { id: "6", name: "IVVB11", ticker: "IVVB11", type: "etf", currentValue: 4200, investedValue: 3800, quantity: 30, averagePrice: 126.67 },
  { id: "7", name: "Itaú Unibanco", ticker: "ITUB4", type: "acao", currentValue: 7300, investedValue: 6500, quantity: 200, averagePrice: 32.5 },
  { id: "8", name: "HGLG11", ticker: "HGLG11", type: "fii", currentValue: 3100, investedValue: 2800, quantity: 20, averagePrice: 140 },
];

export const typeLabels: Record<Investment["type"], string> = {
  acao: "Ação",
  fii: "FII",
  "renda-fixa": "Renda Fixa",
  cripto: "Cripto",
  etf: "ETF",
};
