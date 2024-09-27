import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CribleLiwell} from "../Models/cribleLiwell";
import {getKeyToken} from "../../main";
import {Sbnl} from "../Models/sbnl";

@Injectable({
  providedIn: 'root'
})
export class CribleLiwellService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllCribleLiwells(): Observable<CribleLiwell[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<CribleLiwell[]>(`${this.apiUrl}/cribleLiwells/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getAllCribleLiwellsDTO(): Observable<CribleLiwell[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<CribleLiwell[]>(`${this.apiUrl}/cribleLiwells/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getCribleLiwellById(id:number): Observable<CribleLiwell> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<CribleLiwell>(`${this.apiUrl}/cribleLiwells/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  deleteCribleLiwell(cribleLiwellId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/cribleLiwells/delete/${cribleLiwellId}`, {headers});
  }else {
      return  new Observable<any>()}}
  updateCribleLiwell(cribleLiwell: CribleLiwell): Observable<CribleLiwell> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<CribleLiwell>(`${this.apiUrl}/cribleLiwells/update`, cribleLiwell,{headers});
  }else {
      return  new Observable<any>()}}


  addCribleLiwell(cribleLiwell: CribleLiwell) : Observable<CribleLiwell>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<CribleLiwell>(`${this.apiUrl}/cribleLiwells/add`, cribleLiwell,{headers});

  }else {
      return  new Observable<any>()}}
}
