import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  standalone: true
})
export class ConfirmDialogComponent implements OnInit {
  title!: string;
  message: string = "Are you sure..?";
  btnOkText!: string;
  btnCancelText!: string;
  result!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }

  confirm() {
    this.result = true;
    this.dialogRef.close(true);
  }

  decline() {
    this.result = false;
    this.dialogRef.close(false);
  }

}
