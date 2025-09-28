import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  confirm(title = "Confirmation",
    message = "Are you sure you want to do this..?",
    btnOkText = 'Ok',
    btnCancelText = "Cancel"): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message, btnOkText, btnCancelText }
    });
    return dialogRef.afterClosed();
  }
}
// Removed duplicate class and misplaced code
