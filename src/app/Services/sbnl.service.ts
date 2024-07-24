import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {Sbnl} from "../Models/sbnl";
import {JsonPipe} from "@angular/common";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class SbnlService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSbnls(): Observable<Sbnl[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sbnl[]>(`${this.apiUrl}/sbnls/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getAllSbnlsDTO(): Observable<Sbnl[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sbnl[]>(`${this.apiUrl}/sbnls/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  deleteSbnl(sbnlId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/sbnls/delete/${sbnlId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateSbnl(sbnl: Sbnl): Observable<Sbnl> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Sbnl>(`${this.apiUrl}/sbnls/${sbnl.id}`, sbnl, {headers});
  }else {
      return  new Observable<any>()}}


  addSbnl(sbnl: Sbnl) : Observable<Sbnl>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Sbnl>(`${this.apiUrl}/sbnls/add`,JSON.parse(JSON.stringify(sbnl)), {headers});
  }else {
      return  new Observable<any>()}}
}
