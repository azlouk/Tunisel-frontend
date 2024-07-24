import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class TamisService {

  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}
  deleteTamis(tamisId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/tamis/delete/${tamisId}`, {headers});
  }else {
      return  new Observable<any>()}}

  getDistinctCalibres(): Observable<number[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<number[]>(`${this.apiUrl}/tamis/allCalibres`, {headers});
  }else {
      return  new Observable<any>()}}
}
