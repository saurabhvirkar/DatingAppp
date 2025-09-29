import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RegisterComponent, MatCardModule, MatButtonModule]
})
export class HomeComponent implements OnInit {
  registerMode=false;
  

  constructor() { }

  ngOnInit(): void {
    
  }
   registerToggle()
   {
     this.registerMode = !(this.registerMode);
   }

   cancelRegisterMode(event: boolean)
   {
     this.registerMode=event;
   }

}
