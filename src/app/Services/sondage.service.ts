import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sondage} from "../Models/sondage";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSondage(): Observable<Sondage[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sondage[]>(`${this.apiUrl}/sondages/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deleteSondage(sondageId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/sondages/delete/${sondageId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateSondage(sondage: Sondage): Observable<Sondage> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Sondage>(`${this.apiUrl}/sondages/update`, sondage, {headers});
  }else {
      return  new Observable<any>()}}


  addSondage(sondage: Sondage, id:number) : Observable<Sondage>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Sondage>(`${this.apiUrl}/sondages/add/${id}`, sondage, {headers});
  }else {
      return  new Observable<any>()}}

}
