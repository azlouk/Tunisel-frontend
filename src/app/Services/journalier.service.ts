import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Journalier} from "../Models/journalier";


@Injectable({
  providedIn: 'root'
})
export class JournalierService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllJournaliers(): Observable<Journalier[]> {
    return this.http.get<Journalier[]>(`${this.apiUrl}/journaliers/read`) ;
  }
  getJournalierById(id:any): Observable<Journalier> {
    return this.http.get<Journalier>(`${this.apiUrl}/journaliers/${id}`) ;
  }

  deleteJournalier(JournalierId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/journaliers/delete/${JournalierId}`);
  }
  updateJournalier(journalier: Journalier): Observable<Journalier> {
    return this.http.put<Journalier>(`${this.apiUrl}/journaliers/update`, journalier);
  }


  addJournalier(journalier: Journalier) : Observable<Journalier>{
    return this.http.post<Journalier>(`${this.apiUrl}/journaliers/add`, journalier);
  }
}
