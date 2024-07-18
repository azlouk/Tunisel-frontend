import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JournalierPompe} from "../Models/journalier-pompe";


@Injectable({
  providedIn: 'root'
})
export class JournalierPompeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllJournalierPompe(): Observable<JournalierPompe[]> {
    return this.http.get<JournalierPompe[]>(`${this.apiUrl}/journaliersPompes/read`) ;
  }


  deleteJournalierPompe(JournalierPompeId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/journaliersPompes/delete/${JournalierPompeId}`);
  }
  updateJournalierPompe(JournalierPompe: JournalierPompe): Observable<JournalierPompe> {
    return this.http.put<JournalierPompe>(`${this.apiUrl}/journaliersPompes/update`, JournalierPompe);
  }


  addJournalierPompe(JournalierPompe: JournalierPompe) : Observable<JournalierPompe>{
    return this.http.post<JournalierPompe>(`${this.apiUrl}/journaliersPompes/add`, JournalierPompe);
  }
}
