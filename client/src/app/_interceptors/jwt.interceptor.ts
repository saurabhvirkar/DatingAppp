import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private memberService:MembersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //let currentUser: User;
     debugger
    //this.accountService.currentUser$.pipe().subscribe(user => currentUser == user);
    var currentUser= this.accountService.getCurrentUser();
    if(currentUser!=null)
    {
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
