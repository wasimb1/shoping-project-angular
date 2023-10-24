import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnDestroy {
  message?: string;
  @Output() confirm = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal){}
  ngOnDestroy(): void {

  }

  onConfirm(): void {
    this.confirm.emit(true);
    this.activeModal.close();
  }

  onDecline(): void {
    this.confirm.emit(false);
    this.activeModal.dismiss('cancel');
  }
}
