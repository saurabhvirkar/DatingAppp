import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  standalone: true,
  imports: [CommonModule, MemberCardComponent, FormsModule, MatPaginatorModule]
})
export class ListsComponent implements OnInit {
  members!: Partial<Member[]> | any;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination!: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.laodLikes();
  }

  laodLikes() {
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.laodLikes();
  }
}
