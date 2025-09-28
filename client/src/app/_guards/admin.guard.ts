import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor (private accountService: AccountService, private toastr: ToastrService) {}

  canActivate (): Observable<boolean|any> {
    return this.accountService.currentUser$.pipe(
      map( user => {
        if (user.roles.includes('admin') || user.roles.includes('Moderator')) 
        {
          return true;
        } 
        else
        {
          return this.toastr.error('You cannot Enter this area');
        }
        
      })
    );
  }
  
}
