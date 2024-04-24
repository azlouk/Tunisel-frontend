import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Intervention} from "../Models/inventaire";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment/environment";
import {Bassin} from "../Models/bassin";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.apiUrl}/interventions/read`);
  }

  createIntervention(intervention: Intervention): Observable<Intervention> {
    return this.http.post<Intervention>(`${this.apiUrl}/interventions/add`, intervention);
  }

  updateIntervention(intervention: Intervention): Observable<Intervention> {
    return this.http.put<Intervention>(`${this.apiUrl}/interventions/${intervention.id}`, intervention);

  }

  deleteIntervention(interventionId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/interventions/delete/${interventionId}`);
  }
}
