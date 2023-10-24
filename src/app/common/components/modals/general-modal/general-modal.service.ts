import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralModalComponent } from './general-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GeneralModalService {
  private modalClass: any = {
    0: 'Error',
    1: 'Information',
    2: 'Block',
    3: 'Warning',
    4: 'Success'
  }

  constructor(private modalService: NgbModal) { }

  openModal(type: number, message: string) {
    const modalRef = this.modalService.open(GeneralModalComponent);
    const generalModalComponent: GeneralModalComponent = modalRef.componentInstance;
    generalModalComponent.modalTitle = this.modalClass[type];
    generalModalComponent.modalMesaage = message;
    // generalModalComponent.modalClass = (type === 0  || type === 2) ? `text-danger` : `text-${this.modalClass[type]}`;
    generalModalComponent.modalClass = this.modalClass[type];
  }
}
