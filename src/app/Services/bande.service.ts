import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bande} from "../Models/bande";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class BandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllBandes(): Observable<Bande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Bande[]>(`${this.apiUrl}/bandes/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getAllBandesDTO(): Observable<Bande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Bande[]>(`${this.apiUrl}/bandes/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  deleteBande(bandeId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/bandes/delete/${bandeId}`, {headers});
  }else {
      return  new Observable<any>()}}
  updateBande(bande: Bande): Observable<Bande> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Bande>(`${this.apiUrl}/bandes/update`, bande,{headers});
  }else {
      return  new Observable<any>()}}


  addBande(bande: Bande) : Observable<Bande>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Bande>(`${this.apiUrl}/bandes/add`, bande,{headers});

  }else {
      return  new Observable<any>()}}
}
