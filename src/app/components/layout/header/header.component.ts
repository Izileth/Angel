import { Component } from '@angular/core';
import { UiService, Section } from '../../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private ui: UiService) {}

  showSection(section: Section) {
    this.ui.showSection(section);
  }
}