import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {JournalierPompe} from "../Models/journalier-pompe";
import {getKeyToken} from "../../main";


@Injectable({
  providedIn: 'root'
})
export class JournalierPompeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllJournalierPompe(): Observable<JournalierPompe[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<JournalierPompe[]>(`${this.apiUrl}/journaliersPompes/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deleteJournalierPompe(JournalierPompeId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/journaliersPompes/delete/${JournalierPompeId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateJournalierPompe(JournalierPompe: JournalierPompe): Observable<JournalierPompe> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<JournalierPompe>(`${this.apiUrl}/journaliersPompes/update`, JournalierPompe, {headers});
  }else {
      return  new Observable<any>()}}


  addJournalierPompe(JournalierPompe: JournalierPompe) : Observable<JournalierPompe>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<JournalierPompe>(`${this.apiUrl}/journaliersPompes/add`, JournalierPompe, {headers});
  }else {
      return  new Observable<any>()}}
}
