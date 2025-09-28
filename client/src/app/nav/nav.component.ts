import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { HasRoleDirective } from '../_directives/has-role.directive';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      TitleCasePipe,
      RouterModule,
      HasRoleDirective,
      MatToolbarModule,
      MatButtonModule,
      MatMenuModule,
      MatFormFieldModule,
      MatInputModule
    ]
})
export class NavComponent implements OnInit {
  model: any={}
  

  constructor(public accountService : AccountService, private router: Router,
  ) { }

  ngOnInit(): void {
    
  }
  login()
  {
    this.accountService.login(this.model).subscribe(response =>{
      this.router.navigateByUrl('/members');
    });
  }

  logout()
  { 
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
