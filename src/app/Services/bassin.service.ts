import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bassin} from "../Models/bassin";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class BassinService {

apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllBassins(): Observable<Bassin[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Bassin[]>(`${this.apiUrl}/bassins/read`, {headers});
  }else {
      return  new Observable<any[]>()}}
 getAllBassinsDTO(): Observable<Bassin[]> {
   const token = getKeyToken();
   if (token) {
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Bassin[]>(`${this.apiUrl}/bassins/readDTO`, {headers});
  }else {
     return  new Observable<any>()}}

   getAllBassinsById(bassinId:number): Observable<Bassin> {
     const token = getKeyToken();
     if (token) {
       const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Bassin>(`${this.apiUrl}/bassins/${bassinId}`, {headers});
  }else {
       return  new Observable<any>()}}




  deleteBassin(bassinId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/bassins/delete/${bassinId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateBassin(bassin: Bassin): Observable<Bassin> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Bassin>(`${this.apiUrl}/bassins/update`, bassin, {headers});
  }else {
      return  new Observable<any>()}}
  updateBassindto(bassin: Bassin): Observable<Bassin> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Bassin>(`${this.apiUrl}/bassins/updatedto`, bassin, {headers});
  }else {
      return  new Observable<any>()}}


  addBassin(bassin: Bassin) : Observable<Bassin>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Bassin>(`${this.apiUrl}/bassins/add`, bassin, {headers});
  }else {
      return  new Observable<any>()}}



}
