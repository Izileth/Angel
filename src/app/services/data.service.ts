import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Account, Investment, PortfolioItem, Recommendation, Transaction } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getAccounts() {
    const accounts: Account[] = [
      { name: 'Conta Corrente', balance: 12540.89, change: 2.5 },
      { name: 'Investimentos', balance: 28750.00, change: 8.7 },
      { name: 'Poupança', balance: 5890.45, change: 0.5 },
    ];
    return of(accounts);
  }

  getTransactions() {
    const transactions: Transaction[] = [
      { date: '2025-08-28', description: 'Transferência PIX - John Doe', category: 'Transferências', amount: -500.00, status: 'completed' },
      { date: '2025-08-27', description: 'Pagamento Boleto - Energia', category: 'Pagamentos', amount: -150.75, status: 'completed' },
      { date: '2025-08-26', description: 'Depósito em Dinheiro', category: 'Depósitos', amount: 1000.00, status: 'completed' },
      { date: '2025-08-25', description: 'Compra Online - Amazon', category: 'Pagamentos', amount: -89.90, status: 'completed' },
      { date: '2025-08-24', description: 'Transferência TED - Jane Smith', category: 'Transferências', amount: -2000.00, status: 'pending' },
    ];
    return of(transactions);
  }

  getPortfolioBreakdown() {
    const portfolio: PortfolioItem[] = [
      { name: 'Ações BR', percentage: 45, color: '#3b82f6' },
      { name: 'Ações US', percentage: 25, color: '#8b5cf6' },
      { name: 'Fundos Imobiliários', percentage: 20, color: '#10b981' },
      { name: 'Renda Fixa', percentage: 10, color: '#f59e0b' },
    ];
    return of(portfolio);
  }

  getRecommendations() {
    const recommendations: Recommendation[] = [
      { name: 'Fundo de Ações Tech', description: 'Alto potencial de crescimento no setor de tecnologia.', action: 'Ver Fundo' },
      { name: 'Tesouro Selic 2029', description: 'Baixo risco e liquidez diária, ideal para reserva.', action: 'Investir' },
      { name: 'ETF Global Dólar', description: 'Diversifique seus investimentos com exposição a mercados globais.', action: 'Saber Mais' },
    ];
    return of(recommendations);
  }

  getPatrimonialEvolution() {
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
    const data = [35000, 37000, 40000, 38000, 42000, 45000, 47000];
    return of({ labels, data });
  }

  getPortfolioDistribution() {
    const labels = ['Ações BR', 'Ações US', 'FIIs', 'Renda Fixa'];
    const data = [45, 25, 20, 10];
    return of({ labels, data });
  }
}