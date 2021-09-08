import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import{map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //static getToken() {
    // throw new Error('Method not implemented.');
  // }
  baseUrl=environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();
 
  constructor(private http: HttpClient) { }
  

  login(model:any){
       
      return this.http.post<User>(this.baseUrl +'account/login',model).pipe(
        map((response : User) => {
          const user = response;
          if(user)
          {
            this.setCurrentUser(user);
          }
        })
      )
  }

  register(model:any)
  {
    return this.http.post<User>(this.baseUrl + 'account/register',model).pipe(
      map(user=> {
        if (user){
          this.currentUserSource.next(user); 
        }
      })
    )
  }
  

  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined);
  }

  getCurrentUser()
  { 
    if(localStorage.getItem('user')!= null && localStorage.getItem('user')!= undefined)
    {
      return JSON.parse(localStorage.getItem('user') || '{}'); 
    }
    else 
    {
      return null;
    }
  }


  

//   public getToken(): string | null{
//     return localStorage.getItem('token');
//   }
//   public isAuthenticated(): boolean {
//     // get the token
//     const token = this.getToken();
//     // return a boolean reflecting 
//     // whether or not the token is expired
//     return tokenNotExpired(null, token);
//   }
// }


// function tokenNotExpired(arg0: null, token: string | null): boolean {
//   throw new Error('Function not implemented.');

}

