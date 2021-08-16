import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJib2IiLCJuYmYiOjE2MjkxMDc0MjgsImV4cCI6MTYyOTcxMjIyOCwiaWF0IjoxNjI5MTA3NDI4fQ.MDU80w7khFTKEj0eC58DArgu69td1_GKNFftsMpsnfAe2Do2EwCaDfoHl7_Uj47CbmsL6Q-30hyBfwY4t_5E6Q',
      },
    });
    return next.handle(request);
  }
}
