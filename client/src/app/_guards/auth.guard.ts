import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private accountService: AccountService){}
 
  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user=>{
        if (user) return true;
        else{
          // TODO: Show error with Angular Material Snackbar
          return false;
        }
      })
    )   
}
}
