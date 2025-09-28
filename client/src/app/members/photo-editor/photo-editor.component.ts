import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule]
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;
    selectedFile: File | null = null;
  // Removed FileUploader and dropzone logic
  baseUrl = environment.apiUrl;
  user!: User;



  constructor(private acccountService: AccountService, private memberService: MembersService) {
    this.acccountService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnInit(): void {
    // No uploader initialization needed
  }

    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }

    uploadPhoto() {
      if (!this.selectedFile) return;
      // Implement upload logic using Angular HttpClient here
      // Example: this.memberService.uploadPhoto(this.selectedFile).subscribe(...)
    }

  // Removed dropzone logic

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.acccountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }

  // Removed ng2-file-upload logic. Use uploadPhoto() for Angular Material upload.

}
