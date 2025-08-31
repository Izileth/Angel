import { Component } from '@angular/core';
import { UiService, Section } from '../../../services/ui.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  constructor(private ui: UiService) {}

  showSection(section: Section) {
    this.ui.showSection(section);
  }
}