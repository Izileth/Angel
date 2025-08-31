import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DataService } from '../../../services/data.service';
import { PortfolioItem, Recommendation } from '../../../models/data.model';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investments.component.html',
})
export class InvestmentsComponent implements OnInit, AfterViewInit {
  @ViewChild('portfolioChart') portfolioChartCanvas!: ElementRef<HTMLCanvasElement>;

  portfolioBreakdown: PortfolioItem[] = [];
  recommendations: Recommendation[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPortfolioBreakdown().subscribe(data => {
      this.portfolioBreakdown = data;
    });
    this.dataService.getRecommendations().subscribe(data => {
      this.recommendations = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataService.getPortfolioDistribution().subscribe(chartData => {
      this.createPortfolioChart(chartData);
    });
  }

  createPortfolioChart(chartData: { labels: string[], data: number[] }) {
    if (!this.portfolioChartCanvas) return;
    new Chart(this.portfolioChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          backgroundColor: [
            '#3b82f6',
            '#8b5cf6',
            '#10b981',
            '#f59e0b'
          ],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}