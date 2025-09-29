import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class MemberCardComponent implements OnInit {
  @Input() member!:Member;

  constructor( private memberService: MembersService,
    public presence: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(member:Member){
    this.memberService.addLike(member.username).subscribe(()=>{
  // TODO: Show success with Angular Material Snackbar
    })
  }
  

}
