import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {Product} from "../Models/product";




@Injectable({
  providedIn: 'root'
})
export class UserService {
 apiUrl="http://localhost:8081/"
  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`) .toPromise()
      .then(res => res as User[])
      .then(data => data);
  }

}
