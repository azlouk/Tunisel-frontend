import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pompe} from "../Models/pompe";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class PompeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllPompes(): Observable<Pompe[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Pompe[]>(`${this.apiUrl}/pompes/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deletePompe(PompeId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/pompes/delete/${PompeId}`, {headers});
  }else {
      return  new Observable<any>()}}
  updatePompe(pompe: Pompe): Observable<Pompe> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Pompe>(`${this.apiUrl}/pompes/update`, pompe, {headers});
  }else {
      return  new Observable<any>()}}


  addPompe(pompe: Pompe) : Observable<Pompe>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Pompe>(`${this.apiUrl}/pompes/add`, pompe, {headers});
  }else {
      return  new Observable<any>()}}
}
