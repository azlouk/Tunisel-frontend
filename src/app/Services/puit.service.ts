import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class PuitService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllPuits(): Observable<Puit[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Puit[]>(`${this.apiUrl}/puits/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  deletePuit(puitId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/puits/${puitId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updatePuit(puit: Puit): Observable<Puit> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Puit>(`${this.apiUrl}/puits/${puit.id}`, puit, {headers});
  }else {
      return  new Observable<any>()}}


  addPuit(puit: Puit) : Observable<Puit>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");

    return this.http.post<Puit>(`${this.apiUrl}/puits`, puit, {headers});

  }else {
      return  new Observable<any>()}}



}
