import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {Sbl} from "../Models/sbl";
import {JsonPipe} from "@angular/common";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class SblService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSbl(): Observable<Sbl[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sbl[]>(`${this.apiUrl}/sbls/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getAllSblDTO(): Observable<Sbl[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Sbl[]>(`${this.apiUrl}/sbls/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deleteSbl(sblId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/sbls/delete/${sblId}`, {headers});
  }else {
      return  new Observable<any>()}}


  updateSbl(sbl: Sbl): Observable<Sbl> {

    const token = getKeyToken();
    if (token) {

      console.log(new JsonPipe().transform(sbl.stockOrderList))
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Sbl>(`${this.apiUrl}/sbls/update`, sbl, {headers});
  }else {
      return  new Observable<any>()}}


  addSbl(sbl: Sbl) : Observable<Sbl>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Sbl>(`${this.apiUrl}/sbls/add`, sbl, {headers});

  }else {
      return  new Observable<any>()}}



}
