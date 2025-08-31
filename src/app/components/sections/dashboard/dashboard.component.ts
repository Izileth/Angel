import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UiService, ModalType } from '../../../services/ui.service';
import { DataService } from '../../../services/data.service';
import { Account } from '../../../models/data.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  accounts: Account[] = [];
  private chart: any;

  constructor(
    private ui: UiService,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.dataService.getAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  ngAfterViewInit() {
    // Só executa no browser (cliente)
    if (isPlatformBrowser(this.platformId)) {
      // Pequeno delay para garantir que o DOM está totalmente renderizado
      setTimeout(() => {
        this.dataService.getPatrimonialEvolution().subscribe(chartData => {
          this.createPatrimonialEvolutionChart(chartData);
        });
      }, 100);
    }
  }

  ngOnDestroy() {
    // Limpa o gráfico ao destruir o componente
    if (this.chart) {
      this.chart.destroy();
    }
  }

  openModal(type: ModalType) {
    this.ui.openModal(type);
  }

  getAccountCardClass(name: string): string {
    if (name === 'Conta Corrente') return 'bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-2xl p-6';
    if (name === 'Investimentos') return 'bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-2xl p-6';
    if (name === 'Poupança') return 'bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-2xl p-6';
    return '';
  }

  getAccountTitleClass(name: string): string {
    if (name === 'Conta Corrente') return 'text-blue-300 font-medium';
    if (name === 'Investimentos') return 'text-purple-300 font-medium';
    if (name === 'Poupança') return 'text-green-300 font-medium';
    return '';
  }
  
  getAccountIcon(name: string): string {
    if (name === 'Conta Corrente') return '<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>';
    if (name === 'Investimentos') return '<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>';
    if (name === 'Poupança') return '<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>';
    return '';
  }

  async createPatrimonialEvolutionChart(chartData: { labels: string[], data: number[] }) {
    // Verifica se está no browser e se o canvas existe
    if (!isPlatformBrowser(this.platformId) || !this.chartCanvas) {
      return;
    }

    try {
      // Importação dinâmica do Chart.js para evitar problemas de SSR
      const { default: Chart } = await import('chart.js/auto');
      
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      // Destroi gráfico anterior se existir
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'Patrimônio',
            data: chartData.data,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#3b82f6',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#9ca3af'
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              ticks: {
                color: '#9ca3af'
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Erro ao criar gráfico:', error);
    }
  }
}