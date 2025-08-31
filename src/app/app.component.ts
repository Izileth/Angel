import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeroComponent } from './components/sections/hero/hero.component';
import { DashboardComponent } from './components/sections/dashboard/dashboard.component';
import { TransactionsComponent } from './components/sections/transactions/transactions.component';
import { InvestmentsComponent } from './components/sections/investments/investments.component';
import { FeaturesComponent } from './components/sections/features/features.component';
import { StatsComponent } from './components/sections/stats/stats.component';
import { ModalComponent } from './components/shared/modal/modal.component';

import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    DashboardComponent,
    TransactionsComponent,
    InvestmentsComponent,
    StatsComponent,
    FooterComponent,
    ModalComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angel';

  constructor(public ui: UiService) {}
}