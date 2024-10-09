import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Laverie} from "../Models/laverie";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class LaverieService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllLaveries(): Observable<Laverie[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Laverie[]>(`${this.apiUrl}/laveries/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getAllLaveriesDto(): Observable<Laverie[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Laverie[]>(`${this.apiUrl}/laveries/readDto`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getLaverieById(id:number): Observable<Laverie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Laverie>(`${this.apiUrl}/laveries/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getLaverieDtoById(id:number): Observable<Laverie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Laverie>(`${this.apiUrl}/laveries/${id}/Dto`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  deleteLaverie(LaverieId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/laveries/delete/${LaverieId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateLaverie(laverie: Laverie): Observable<Laverie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<Laverie>(`${this.apiUrl}/laveries/update`, laverie, {headers});
    }else {
      return  new Observable<any>()}}


  addLaverie(laverie: Laverie) : Observable<Laverie>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<Laverie>(`${this.apiUrl}/laveries/add`, laverie, {headers});
    }else {
      return  new Observable<any>()}}
}
