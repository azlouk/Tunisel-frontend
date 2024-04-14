import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {Product} from "../Models/product";




@Injectable({
  providedIn: 'root'
})
export class UserService {
 apiUrl="http://localhost:8081"
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/read`) ;
  }
  deleteUser(userId: number): Observable<any> {
    //const url = `${this.apiUrl}/users/delete/${userId}`; // Utilisez l'URL appropriée pour supprimer l'utilisateur par son ID
    console.log(`${this.apiUrl}/users/delete/${userId}`)
    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`);
  }


}
