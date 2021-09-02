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
   accountService: any;

   constructor() {}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     request = request.clone({
       setHeaders: {
         Authorization:`Bearer ${this.accountService.getTokens()}`
       }
     });
       return next.handle(request);
   }
 }