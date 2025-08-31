import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(public ui: UiService) {}

  closeModal() {
    this.ui.closeModal();
  }

  get modalTitle(): string {
    switch (this.ui.modalType()) {
      case 'transfer': return 'Transferir Dinheiro';
      case 'payment': return 'Realizar Pagamento';
      case 'deposit': return 'Depositar Dinheiro';
      case 'invest': return 'Realizar Investimento';
      default: return '';
    }
  }
}