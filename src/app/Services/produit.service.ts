import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../Models/produit";
import {getKeyToken} from "../../main";




@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getProduit(): Observable<Produit[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Produit[]>(`${this.apiUrl}/produits/read`, {headers});
  }else {
      return  new Observable<any>()}}

  getProduitById(produitid:number): Observable<Produit> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Produit>(`${this.apiUrl}/produits/`+produitid, {headers});
  }else {
      return  new Observable<any>()}}

  createProduit(produit: Produit): Observable<Produit> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Produit>(`${this.apiUrl}/produits/add`, produit, {headers});
  }else {
      return  new Observable<any>()}}

  updateProduit(produit: Produit): Observable<Produit> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Produit>(`${this.apiUrl}/produits/update/${produit.id}`, produit, {headers});

  }else {
      return  new Observable<any>()}}

  deleteProduit(produitId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/produits/delete/${produitId}`, {headers});
  }else {
      return  new Observable<any>()}}



}
