import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {ResultConcasseur} from "../Models/result-concasseur";

@Injectable({
  providedIn: 'root'
})
export class ResultConcasseurService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllResultConcasseurs(): Observable<ResultConcasseur[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<ResultConcasseur[]>(`${this.apiUrl}/resultConcasseurs/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getResultConcasseurById(id:number): Observable<ResultConcasseur> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<ResultConcasseur>(`${this.apiUrl}/resultConcasseurs/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteResultConcasseur(ResultResultResultConcasseurId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/resultConcasseurs/delete/${ResultResultResultConcasseurId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateResultConcasseur(resultConcasseur: ResultConcasseur): Observable<ResultConcasseur> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<ResultConcasseur>(`${this.apiUrl}/resultConcasseurs/update`, resultConcasseur, {headers});
    }else {
      return  new Observable<any>()}}


  addResultConcasseur(resultConcasseur: ResultConcasseur,cribleId:number) : Observable<ResultConcasseur>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<ResultConcasseur>(`${this.apiUrl}/resultConcasseurs/add/${cribleId}`, resultConcasseur, {headers});
    }else {
      return  new Observable<any>()}}
}
