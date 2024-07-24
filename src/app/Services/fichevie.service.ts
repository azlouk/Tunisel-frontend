import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FicheVie} from "../Models/fichevie";
import {environment} from "../environment/environment";
import {getKeyToken} from "../../main";



@Injectable({
  providedIn: 'root'
})
export class FicheVieService {

  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getFichesVies(): Observable<FicheVie[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<FicheVie[]>(`${this.apiUrl}/fichesvies/read`, {headers});
  }else {
      return  new Observable<any>()}}
    getFicheById(ficheid:number): Observable<FicheVie> {
      const token = getKeyToken();
      if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<FicheVie>(`${this.apiUrl}/fichesvies/`+ficheid, {headers});
  }else {
        return  new Observable<any>()}}

  createFicheVie(ficheVie: FicheVie): Observable<FicheVie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<FicheVie>(`${this.apiUrl}/fichesvies/add`, ficheVie, {headers});
  }else {
      return  new Observable<any>()}}

  updateFicheVie(ficheVie: FicheVie): Observable<FicheVie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<FicheVie>(`${this.apiUrl}/fichesvies/update`, ficheVie, {headers});

  }else {
      return  new Observable<any>()}}

  deleteFicheVie(ficheVieId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/fichesvies/delete/${ficheVieId}`, {headers});
  }else {
      return  new Observable<any>()}}
}

