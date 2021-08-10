import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  users: any;
  title= "The Dating App"
  
  
  constructor(private http: HttpClient){}

  ngOnInit() 
  {
    this.getUsers();
  }

  setCurrentUser()
  {
    const user : User = JSON.parse(localStorage.getItem('user'));
  }
  getUsers():any
  {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');

    this.http.get("https://localhost:5001/api/users",{responseType:'json',headers:httpHeaders}).subscribe(response => {
      this.users= response;
      
    }, error => {
      console.log(error);
    }
    )
  }
}
