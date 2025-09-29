import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MemberCardComponent, MatPaginatorModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule]
})
export class MemberListComponent implements OnInit {
  members : Member[] | null=[];
  pagination! : Pagination ;
  userParams!: UserParams;
  user!: User;
  genderList =[{value: 'male', display:'Males'}, {value: 'female', display:'Female'}];


  constructor(private memberService: MembersService , private accountService:AccountService) {
    this.userParams = this.memberService.getUserParams();
   }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userParams = new UserParams(user);
      }
    });
    this.loadMember();
  }

  loadMember(){
    //this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members= response.result;
      this.pagination= response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMember();
    
  }

  pageChanged( event : any){
    this.userParams.pageNumber= event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMember();

  }
}
