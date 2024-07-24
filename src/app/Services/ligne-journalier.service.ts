import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LigneJournalier} from "../Models/ligne-journalier";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class LigneJournalierService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllLigneJournaliers(): Observable<LigneJournalier[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LigneJournalier[]>(`${this.apiUrl}/lignesJournaliers/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deleteLigneJournalier(LigneJournalierId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/lignesJournaliers/delete/${LigneJournalierId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateLigneJournalier(ligneJournalier: LigneJournalier): Observable<LigneJournalier> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<LigneJournalier>(`${this.apiUrl}/lignesJournaliers/update`, ligneJournalier, {headers});
  }else {
      return  new Observable<any>()}}


  addLigneJournalier(ligneJournalier: LigneJournalier) : Observable<LigneJournalier>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<LigneJournalier>(`${this.apiUrl}/lignesJournaliers/add`, ligneJournalier, {headers});
  }else {
      return  new Observable<any>()}}

  getLigneJournalierByBassinAndMonth(bassinId: number, month: number, year: number): Observable<LigneJournalier[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    // Create an instance of HttpParams
    let params = new HttpParams();

    // Set the query parameters
    params = params.set('month', month);
    params = params.set('year', year);

    // Make the HTTP GET request with the params
      const httpOptions = {
        headers: headers,
        params: params
      };
    return this.http.get<LigneJournalier[]>(`${this.apiUrl}/lignesJournaliers/ligneJournalList/${bassinId}`, httpOptions);
  }else {
      return  new Observable<any[]>()}}
}
