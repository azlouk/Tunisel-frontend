import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {Sblf} from "../Models/sblf";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class SblfService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSblfs(): Observable<Sblf[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sblf[]>(`${this.apiUrl}/sblfs/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getAllSblfsDTO(): Observable<Sblf[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sblf[]>(`${this.apiUrl}/sblfs/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  deleteSblf(sblfId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/sblfs/delete/${sblfId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateSblf(sblf: Sblf): Observable<Sblf> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Sblf>(`${this.apiUrl}/sblfs/${sblf.id}`, sblf, {headers});
  }else {
      return  new Observable<any>()}}


  addSblf(sblf: Sblf) : Observable<Sblf>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");

    return this.http.post<Sblf>(`${this.apiUrl}/sblfs/add`,sblf, {headers});

  }else {
      return  new Observable<any>()}}
}
