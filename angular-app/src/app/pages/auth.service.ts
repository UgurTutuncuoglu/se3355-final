import { Injectable } from "@angular/core";
import { User } from "./types";
import { HttpClient } from "@angular/common/http";
import { Observable ,BehaviorSubject} from "rxjs";
import { Route, Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthService{
   private apiUrl = "https://se3355-final.vercel.app/";
//    private currentUser: User|null = null;
   private currentUserSubject: BehaviorSubject<User | null>;
   public currentUser$: Observable<User | null>; 

   constructor(private http: HttpClient,
    private router: Router
   ){
    const storedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User|null>(
        storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
   }





   register(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/api/register`,userData);
   }


   login(credentials: {email: string,password: string}) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/login`,credentials);
   }

   setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

   setCurrentUser(user: User){
    this.currentUserSubject?.next(user); 
    localStorage.setItem('user',JSON.stringify(user));
    console.log("Current user:",user);
   }


    getCurrentUser(): User | null {
        
        return this.currentUserSubject?.value;
    }

   logout(){
    // this.currentUser = null;
    // localStorage.removeItem('user');
    // this.router.navigate(['/']);
    //console.log('Current user in auth:' ,this.currentUser);
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    console.log('Current user in auth:', this.currentUserSubject.value);    
  }


  
}