import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineCommande} from "../Models/lineCommande";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class LineCommandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllLineCommande(): Observable<LineCommande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande[]>(`${this.apiUrl}/lineCommandes/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getLineCommandeById(lineCommandeId:number): Observable<LineCommande> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande>(`${this.apiUrl}/lineCommandes/`+lineCommandeId, {headers});
  }else {
      return  new Observable<any>()}}

  deleteLineCommande(lineCommandeId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/ligneCommandes/delete/${lineCommandeId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateLineCommande(lineCommande: LineCommande): Observable<LineCommande> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<LineCommande>(`${this.apiUrl}/ligneCommandes/update`, lineCommande, {headers});
  }else {
      return  new Observable<any>()}}


  addLineCommande(lineCommande: LineCommande) : Observable<LineCommande>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<LineCommande>(`${this.apiUrl}/ligneCommandes/add`,lineCommande, {headers});

  }else {
      return  new Observable<any>()}}
}
