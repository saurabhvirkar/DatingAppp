import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelRef!: BsModalRef | any;

  constructor(private modalService: BsModalService) { }

  confirm(title = "Confirmation",
    messsge = "Are you sure you want to do this..?",
    btnOkText = 'Ok',
    btnCancelText = "Cancel"): Observable<boolean> {
    const config = {
      initialState: {
        title,
        messsge,
        btnOkText,
        btnCancelText
      }
    }

    this.bsModelRef = this.modalService.show(ConfirmDialogComponent, config);
    return new Observable<boolean>(this.getResult());


  }
  private getResult() {
    return (observer: any) => {
      const subscription = this.bsModelRef.onHidden.subscribe(() => {
        observer.next(this.bsModelRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }
}
