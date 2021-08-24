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
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJsaXNhIiwibmJmIjoxNjI5NzE1MDUzLCJleHAiOjE2MzAzMTk4NTMsImlhdCI6MTYyOTcxNTA1M30.KtA9_xVI_rfWJYOxq6PhvcXHdM_rtw1ts0OnK-ntkwpJq3xPoG3e2-zhzTLBVxRCA6dpwySIOYj1_A_f0G9A7w',
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
