import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recolte} from "../Models/recolte";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class RecolteService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllRecolte(): Observable<Recolte[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Recolte[]>(`${this.apiUrl}/recoltes/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deleteRecolte(RecolteId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/recoltes/delete/${RecolteId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateRecolte(Recolte: Recolte): Observable<Recolte> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Recolte>(`${this.apiUrl}/recoltes/update`, Recolte, {headers});
  }else {
      return  new Observable<any>()}}


  addRecolte(Recolte: Recolte, id:number) : Observable<Recolte>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Recolte>(`${this.apiUrl}/recoltes/add/${id}`, Recolte, {headers});
  }else {
      return  new Observable<any>()}}

  getSumRecoltePerMonthByBassinIdsAndYear( year:number,bassinsId:number[]) : Observable<any>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<any>(`${this.apiUrl}/recoltes/sum-per-month/${year}`, bassinsId, {headers});
  }else {
      return  new Observable<any>()}}
}
