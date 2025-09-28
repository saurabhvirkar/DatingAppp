import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Message } from '../_models/message';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Pagination } from '../_models/pagination';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe, RouterModule, MatPaginatorModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule]
})
export class MessagesComponent implements OnInit {
  messages: Message[]|any =[];
  pagination!: Pagination;
  container ='Unread';
  pageNumber = 1;
  pageSize =5;
  loading = false;


  constructor(private messageService : MessageService, private confirmService:ConfirmService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.loading=true;
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(response =>{
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading=false;
    })
  }
  
  deleteMessage(id: number) {
    this.confirmService.confirm("Confirm delete message", "This cannot be undone").subscribe(result =>{
      if(result){
        this.messageService.deleteMessage(id).subscribe(() =>{
          this.messages.splice(this.messages.findIndex((m:any) =>m.id === id), 1);
     })
    }
   })
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
