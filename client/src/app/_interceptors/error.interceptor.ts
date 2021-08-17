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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
       setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q',
       },
     });
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