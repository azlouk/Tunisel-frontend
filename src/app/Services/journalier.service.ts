import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Journalier} from "../Models/journalier";
import {getKeyToken} from "../../main";


@Injectable({
  providedIn: 'root'
})
export class JournalierService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllJournaliers(): Observable<Journalier[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Journalier[]>(`${this.apiUrl}/journaliers/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getJournalierById(id:any): Observable<Journalier> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Journalier>(`${this.apiUrl}/journaliers/${id}`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  deleteJournalier(JournalierId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/journaliers/delete/${JournalierId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateJournalier(journalier: Journalier): Observable<Journalier> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Journalier>(`${this.apiUrl}/journaliers/update`, journalier, {headers});
  }else {
      return  new Observable<any>()}}


  addJournalier(journalier: Journalier) : Observable<Journalier>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Journalier>(`${this.apiUrl}/journaliers/add`, journalier, {headers});
  }else {
      return  new Observable<any>()}}
}
