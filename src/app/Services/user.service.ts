import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {UserType} from "../Enum/user-type";
import {environment} from "../environment/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {

 apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admins/read`);
  }

  getEmployers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/employers/read`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/read`);
  }
  deleteUser(userId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`);
  }

  saveUser(user: User): Observable<User> {

    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }
  saveEmployer(user: User) {
    return this.http.put<User>(`${this.apiUrl}/employers/${user.id}`, user);

  }

  addAdmin(user: User) : Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/admins/add`, user);
  }

  AddEmployer(user: User) {
    console.log("create Employer");
    return this.http.post<User>(`${this.apiUrl}/employers/add`, user);

  }



}
