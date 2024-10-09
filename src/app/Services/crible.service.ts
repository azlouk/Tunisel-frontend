import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {Crible} from "../Models/crible";

@Injectable({
  providedIn: 'root'
})
export class CribleService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllCribles(): Observable<Crible[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Crible[]>(`${this.apiUrl}/cribles/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getAllCriblesDto(): Observable<Crible[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Crible[]>(`${this.apiUrl}/cribles/readDto`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getCribleById(id:number): Observable<Crible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Crible>(`${this.apiUrl}/cribles/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteCrible(CribleId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/cribles/delete/${CribleId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateCrible(crible: Crible): Observable<Crible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<Crible>(`${this.apiUrl}/cribles/update`, crible, {headers});
    }else {
      return  new Observable<any>()}}


  addCrible(crible: Crible) : Observable<Crible>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<Crible>(`${this.apiUrl}/cribles/add`, crible, {headers});
    }else {
      return  new Observable<any>()}}


}
