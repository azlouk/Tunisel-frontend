import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {ResultCrible} from "../Models/result-crible";

@Injectable({
  providedIn: 'root'
})
export class ResultCribleService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllResultCribles(): Observable<ResultCrible[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<ResultCrible[]>(`${this.apiUrl}/resultCribles/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getResultCribleById(id:number): Observable<ResultCrible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<ResultCrible>(`${this.apiUrl}/resultCribles/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteResultCrible(ResultResultResultCribleId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/resultCribles/delete/${ResultResultResultCribleId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateResultCrible(resultCrible: ResultCrible): Observable<ResultCrible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<ResultCrible>(`${this.apiUrl}/resultCribles/update`, resultCrible, {headers});
    }else {
      return  new Observable<any>()}}


  addResultCrible(resultCrible: ResultCrible,cribleId:number) : Observable<ResultCrible>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<ResultCrible>(`${this.apiUrl}/resultCribles/add/${cribleId}`, resultCrible, {headers});
    }else {
      return  new Observable<any>()}}

}
