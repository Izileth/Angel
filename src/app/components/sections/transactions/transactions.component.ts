import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { Transaction } from '../../../models/data.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  loadMoreTransactions() {
    console.log('Loading more transactions...');
    // Here you would typically call the service to get more data and append it
  }

  getStatusClass(status: 'completed' | 'pending' | 'cancelled'): string {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-400';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400';
      case 'cancelled': return 'bg-red-500/10 text-red-400';
    }
  }
}
