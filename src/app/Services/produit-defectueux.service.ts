import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitDefectueux} from "../Models/produitDefectueux";
import {environment} from "../environment/environment";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class ProduitDefectueuxService {



  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllProduitsDefectueux(): Observable<ProduitDefectueux[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<ProduitDefectueux[]>(`${this.apiUrl}/produitsDefectueux/read`, {headers});
  }else {
      return  new Observable<any>()}}

  getProduitDefectueuxById(id: number): Observable<ProduitDefectueux> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    const url = `${this.apiUrl}/produitsDefectueux/${id}`;
    return this.http.get<ProduitDefectueux>(url, {headers});
  }else {
      return  new Observable<any>()}}

  createProduitDefectueux(produitDefectueux: ProduitDefectueux): Observable<ProduitDefectueux> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<ProduitDefectueux>(`${this.apiUrl}/produitsDefectueux/add`, produitDefectueux, {headers});
  }else {
      return  new Observable<any>()}}

  updateProduitDefectueux(produitDefectueux: ProduitDefectueux): Observable<ProduitDefectueux> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    const url = `${this.apiUrl}/produitsDefectueux/update/${produitDefectueux.id}`;
    return this.http.put<ProduitDefectueux>(url, produitDefectueux, {headers});
  }else {
      return  new Observable<any>()}}

  deleteProduitDefectueux(id: number| undefined): Observable<void> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    const url = `${this.apiUrl}/produitsDefectueux/delete/${id}`;
    return this.http.delete<void>(url, {headers});
  }else {
      return  new Observable<any>()}}
}


