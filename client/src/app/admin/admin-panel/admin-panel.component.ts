import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/_modules/shared.module';
import { UserManagementComponent } from '../user-management/user-management.component';
import { PhotoManagementComponent } from '../photo-management/photo-management.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  standalone: true,
    imports: [
      SharedModule,
      UserManagementComponent,
      PhotoManagementComponent,
      MatCardModule,
      MatTabsModule
    ],
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
