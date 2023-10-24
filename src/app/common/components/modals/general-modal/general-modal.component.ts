import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss']
})
export class GeneralModalComponent {
  modalClass: string = '';
  modalTitle?: string;
  modalMesaage?: string;

  constructor(public activeModal: NgbActiveModal) { }

}
