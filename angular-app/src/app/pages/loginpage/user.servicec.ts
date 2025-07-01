import { Injectable } from "@angular/core";
import { User } from "../types";


@Injectable({
  providedIn: 'root'
})



export class UserService {
   private users: User[] = [];
   constructor() {
   
  }

   addUser(user: User): void {
    this.users.push(user);
   }

   getUsers(): User[]{
    return this.users;
   }

   //Get user by id
   getUserById(id: number): User | undefined {
    return this.users.find(i => i.id === id);
   }
   // Get user by email
  getUserByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  // Validate login
  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    return user ?? null;
  }

  // Clear all users (optional utility)
  clearUsers(): void {
    this.users = [];
  }

}
