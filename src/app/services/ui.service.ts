import { Injectable, signal } from '@angular/core';

export type Section = 'hero' | 'dashboard' | 'transactions' | 'investments' | 'features';
export type ModalType = 'transfer' | 'payment' | 'deposit' | 'invest';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  activeSection = signal<Section>('hero');

  isModalOpen = signal(false);
  modalType = signal<ModalType | null>(null);

  constructor() { }

  showSection(section: Section) {
    this.activeSection.set(section);
  }

  openModal(type: ModalType) {
    this.modalType.set(type);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.modalType.set(null);
  }
}