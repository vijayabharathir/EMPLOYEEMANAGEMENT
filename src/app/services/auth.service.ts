import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7082/api/User/';
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) {
    
   
   }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  login(loginObj : any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
    .pipe(
      tap((User) => {
        localStorage.setItem('userdata', JSON.stringify(User));
      })
    );
  }

  signOut(){
    localStorage.removeItem('user-store');
    this.router.navigate(['login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user-store');
  }

 
}