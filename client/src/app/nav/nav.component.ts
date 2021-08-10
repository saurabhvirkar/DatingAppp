import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any={}
  User:any={}
  //loggedIn: boolean | undefined;

  currentUser$: Observable<User> | undefined;

  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
    this.currentUser$=this.accountService.currentUser$;
  }
  login()
  {
    this.accountService.login(this.model).subscribe((response:any) =>{
      console.log(response);
      //this.loggedIn=true;
    }, (error:any) => {
      console.log(error);
    });
  }

  logout()
  { 
    this.accountService.logout();
    //this.loggedIn=false;
  }
}
