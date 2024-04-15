import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {Product} from "../Models/product";
import {environment} from "../environment/environment";




@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/read`);
  }
  deleteUser(id:number):Observable<void>{
   return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
  saveUser(newUser:User):Observable<User>{
   return this.http.post<User>(`${this.apiUrl}/users`,newUser);
  }
  updateUser(newUser:User,id:number):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}/users/${id}`,newUser);
  }
  getUserById(id:number):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

}
