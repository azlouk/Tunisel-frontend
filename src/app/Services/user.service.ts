import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../environment/environment";
import {RegisterRequest} from "../Models/register-request";
import {AuthenticationResponse} from "../Models/authentication-response";
import {ChangePasswordRequest} from "../Models/change-password-request";
import {getKeyToken, getToken} from "../../main";




@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<RegisterRequest[]> {
    const token = getKeyToken();
    // console.log(token)
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<RegisterRequest[]>(`${this.apiUrl}/users/read`, {headers});
  }else {
      return  new Observable<any[]>()}

  }


  deleteUser(userId: number): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/users/delete/${userId}`, {headers});
    }else {
      return  new Observable<any[]>()}
  }


  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<AuthenticationResponse>(`${this.apiUrl}/users/auth/register`, request, {headers});
    }else {
      return  new Observable<any>()}

  }


  changePassword(changePasswordRequest: ChangePasswordRequest,id:number): Observable<any> {
    const token = getKeyToken();
    console.log(token)
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<any>(`${this.apiUrl}/users/updatePassword/${id}`, changePasswordRequest, {headers});
    }else {
      return  new Observable<any[]>()}
  }
    getUserConnect(): Observable<RegisterRequest> {
    const token = getKeyToken();
    // console.log(token)
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<RegisterRequest>(`${this.apiUrl}/users/userConnecte`,{headers});
    }else {
      return  new Observable<any>()}
  }




}
