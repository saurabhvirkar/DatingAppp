import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, PhotoEditorComponent, MatCardModule, MatButtonModule, MatIconModule]
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!:Member;
  user!: User;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }
  }



  constructor(private accountService: AccountService,private memberServce:MembersService,
  ) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        if (user) {
          this.user = user;
        }
      });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberServce.getMember(this.user.username).subscribe(member => {
      this.member =member;
    })
  }

  updateMember(){
    console.log(this.member);
  // TODO: Show success with Angular Material Snackbar
    this.editForm.reset(this.member);
  }
}
