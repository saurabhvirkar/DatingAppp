import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any={}
  User:any={}
  loggedIn: boolean | undefined;

  constructor(private accountService : AccountService) { }

  ngOnInit(): void {
  }
  login()
  {
    this.accountService.login(this.model).subscribe((response:any) =>{
      console.log(response);
      this.loggedIn=true;
    }, (error:any) => {
      console.log(error);
    });
  }

  logout()
  { 
    this.loggedIn=false;
  }
}
