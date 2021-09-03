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
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  

  constructor(private router:Router, private toastr: ToastrService, private memberService:MembersService, public accountService:AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    debugger
   this.accountService.currentUser$.pipe().subscribe(user => currentUser == user);
   if(currentUser!)
   {
     request = request.clone({
       setHeaders:{
         Authorization:`Bearer ${currentUser.token}`
       }
     });
   }
    return next.handle(request).pipe(
      
      catchError(error =>{
       
        if (error){
          switch (error.status) {
            case 400:
              if(error.error.errors)
              {
                const modalStateErrors =[];
                for(const key in error.error.errors)
                {
                  if (error.error.errors[key])
                  {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              }
              else{
                this.toastr.error(error.statusText, error.status);
              }
              break;
            case 401:
              this.toastr.error(error.statusText,error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras={state: {error:error.error}}
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        } 
        return throwError(error);
      })
    );
  } 
}
