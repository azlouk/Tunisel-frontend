import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LigneJournalier} from "../Models/ligne-journalier";

@Injectable({
  providedIn: 'root'
})
export class LigneJournalierService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllLigneJournaliers(): Observable<LigneJournalier[]> {
    return this.http.get<LigneJournalier[]>(`${this.apiUrl}/lignesJournaliers/read`) ;
  }


  deleteLigneJournalier(LigneJournalierId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lignesJournaliers/delete/${LigneJournalierId}`);
  }
  updateLigneJournalier(ligneJournalier: LigneJournalier): Observable<LigneJournalier> {
    return this.http.put<LigneJournalier>(`${this.apiUrl}/lignesJournaliers/update`, ligneJournalier);
  }


  addLigneJournalier(ligneJournalier: LigneJournalier) : Observable<LigneJournalier>{
    return this.http.post<LigneJournalier>(`${this.apiUrl}/lignesJournaliers/add`, ligneJournalier);
  }

  getLigneJournalierByBassinAndMonth(bassinId: number, month: number, year: number): Observable<LigneJournalier[]> {
    // Create an instance of HttpParams
    let params = new HttpParams();

    // Set the query parameters
    params = params.set('month', month);
    params = params.set('year', year);

    // Make the HTTP GET request with the params
    return this.http.get<LigneJournalier[]>(`${this.apiUrl}/lignesJournaliers/ligneJournalList/${bassinId}`, { params: params });
  }
}
