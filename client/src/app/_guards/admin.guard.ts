import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor (private accountService: AccountService) {}

  canActivate (): Observable<boolean|any> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user && (user.roles.includes('admin') || user.roles.includes('Moderator'))) {
          return true;
        } else {
          // TODO: Show error with Angular Material Snackbar
          return false;
        }
      })
    );
  }
  
}
