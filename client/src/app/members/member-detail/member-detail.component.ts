import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryComponent } from '../../gallery/gallery.component';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';
// Removed TabsetComponent and TabDirective imports


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone: true,
  imports: [CommonModule, GalleryComponent, MemberMessagesComponent, DatePipe, MatTabsModule]
})
export class MemberDetailComponent implements OnInit , OnDestroy {
  member!: Member;
  images: string[] = [];
  messages: Message[] = [];
  user!: User;
  // Removed memberTabs and activeTab properties



  constructor(public presence: PresenceService,private route: ActivatedRoute,
       private messageService: MessageService, private accountService: AccountService,
       private router : Router) 
      {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
          if (user) {
            this.user = user;
          }
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }
  

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
  this.member = data['member'];
    });

  // TODO: Use Angular Material Tabs for tab selection

    // Convert member photos to image URLs for gallery
    if (this.member && this.member.photos) {
      this.images = this.member.photos.filter(p => p.isApproved).map(p => p.url);
    }

  // Removed galleryImages and getImages()
  }

  // Removed getImages()

  // loadMember(){
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('username') ||'{}').subscribe(member=>{
  //     this.member=member;
      
  //   })
  // }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages =>{
      this.messages=messages;
    })
  }

  // TODO: Use Angular Material Tabs logic for tab selection and activation
  
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}