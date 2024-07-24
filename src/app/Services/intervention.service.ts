import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Intervention} from "../Models/intervention";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environment/environment";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getInterventions(): Observable<Intervention[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Intervention[]>(`${this.apiUrl}/interventions/read`, {headers});
  }else {
      return  new Observable<any>()}}

  createIntervention(intervention: Intervention): Observable<Intervention> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Intervention>(`${this.apiUrl}/interventions/add`, intervention, {headers});
  }else {
      return  new Observable<any>()}}

  updateIntervention(intervention: Intervention): Observable<Intervention> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Intervention>(`${this.apiUrl}/interventions/${intervention.id}`, intervention, {headers});

  }else {
      return  new Observable<any>()}}

  deleteIntervention(interventionId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/interventions/delete/${interventionId}`, {headers});
  }else {
      return  new Observable<any>()}}
}
