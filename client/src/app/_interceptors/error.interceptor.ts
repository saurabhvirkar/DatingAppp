import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  

  constructor(private router:Router, private memberService:MembersService, public accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User | null = null;
    this.accountService.currentUser$.pipe().subscribe(user => currentUser = user);
    if(currentUser) {
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${(currentUser as User).token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof(error.error) === 'object') {
                  // TODO: Show error with Angular Material Snackbar
              } else {
                // TODO: Show error with Angular Material Snackbar
              }
              break;
            case 401:
                // TODO: Show error with Angular Material Snackbar
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              // TODO: Show error with Angular Material Snackbar
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  } 
}
