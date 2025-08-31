export interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Investment {
  name: string;
  type: string;
  value: number;
  change: number;
}

export interface Account {
  name: string;
  balance: number;
  change: number;
}

export interface PortfolioItem {
  name: string;
  percentage: number;
  color: string;
}

export interface Recommendation {
  name: string;
  description: string;
  action: string;
}
