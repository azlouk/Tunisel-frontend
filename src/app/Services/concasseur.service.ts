import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Concasseur} from "../Models/concasseur";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class ConcasseurService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllConcasseurs(): Observable<Concasseur[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Concasseur[]>(`${this.apiUrl}/concasseurs/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getConcasseurById(id:number): Observable<Concasseur> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Concasseur>(`${this.apiUrl}/concasseurs/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteConcasseur(ConcasseurId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/concasseurs/delete/${ConcasseurId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateConcasseur(concasseur: Concasseur): Observable<Concasseur> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<Concasseur>(`${this.apiUrl}/concasseurs/update`, concasseur, {headers});
    }else {
      return  new Observable<any>()}}


  addConcasseur(concasseur: Concasseur) : Observable<Concasseur>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<Concasseur>(`${this.apiUrl}/concasseurs/add`, concasseur, {headers});
    }else {
      return  new Observable<any>()}}
}
