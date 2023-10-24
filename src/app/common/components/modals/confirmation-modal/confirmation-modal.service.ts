import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  constructor(private modalService: NgbModal) { }

  openConfirmationModal(message: string): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      backdrop: 'static',
    });
    const confirmationComponent: ConfirmationModalComponent = modalRef.componentInstance;
    confirmationComponent.message = message;

    return new Observable<boolean>((observer) => {
      confirmationComponent.confirm.subscribe((res) => {
        observer.next(res);
        observer.complete();
      });
    });
  }
}
