import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Saline} from "../Models/saline";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class SalineService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSaline(): Observable<Saline[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Saline[]>(`${this.apiUrl}/salines/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getSalineById(id:number): Observable<Saline> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Saline>(`${this.apiUrl}/salines/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  deleteSaline(SalineId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/salines/delete/${SalineId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateSaline(Saline: Saline): Observable<Saline> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Saline>(`${this.apiUrl}/salines/update`, Saline, {headers});
  }else {
      return  new Observable<any>()}}


  addSaline(Saline: Saline,id:number) : Observable<Saline>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Saline>(`${this.apiUrl}/salines/add/${id}`, Saline, {headers});
  }else {
      return  new Observable<any>()}}
}
