import { Component, EventEmitter, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-model',
  templateUrl: './roles-model.component.html',
  styleUrls: ['./roles-model.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RolesModelComponent implements OnInit {
  updateSelectedRoles = new EventEmitter();
  user!: User;
  roles!: any[];

  constructor(
    public dialogRef: MatDialogRef<RolesModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.roles = data.roles;
  }

  ngOnInit(): void {}

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.dialogRef.close(this.roles);
  }

}
