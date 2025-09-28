
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
import { NavComponent } from './nav/nav.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BusyService } from './_services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, NavComponent, MatProgressSpinnerModule, CommonModule]
})
export class AppComponent implements OnInit, AfterViewInit {
  users: any;
  title = "The Dating App";
  constructor(
    private accountService: AccountService,
    private presence: PresenceService,
    public busyService: BusyService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  setCurrentUser() {
    if (typeof window !== 'undefined') {
      const user: User = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        this.accountService.setCurrentUser(user);
        //this.presence.createHubConnection(user);
      }
    }
  }
}
