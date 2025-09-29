import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatDialogModule],
  template: `
    <mat-grid-list cols="3" rowHeight="150px">
      <mat-grid-tile *ngFor="let image of images" (click)="openImage(image)">
        <img [src]="image" alt="Gallery image" style="width:100%;height:100%;object-fit:cover;cursor:pointer;" />
      </mat-grid-tile>
    </mat-grid-list>
    <ng-template></ng-template>
  `,
  styles: [`
    mat-grid-tile { padding: 4px; }
  `]
})
export class GalleryComponent {
  @Input() images: string[] = [];

  constructor(private dialog: MatDialog) {}

  openImage(image: string) {
    this.dialog.open(GalleryDialogComponent, {
      data: { image },
      panelClass: 'gallery-dialog'
    });
  }
}

@Component({
  selector: 'app-gallery-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <div mat-dialog-content style="text-align:center;">
      <img [src]="data.image" alt="Full image" style="max-width:100%;max-height:80vh;" />
    </div>
  `
})
export class GalleryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string }) {}
}
