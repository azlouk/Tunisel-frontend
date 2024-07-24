import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Inventaire} from "../Models/inventaire";
import {Produit} from "../Models/produit";
import {getKeyToken} from "../../main";


@Injectable({
  providedIn: 'root'
})
export class InventaireService {
  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getInventaires(): Observable<Inventaire[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Inventaire[]>(`${this.apiUrl}/inventaires/read`, {headers});
  }else {
      return  new Observable<any>()}}
  getInventaireById(inventaireid:number): Observable<Inventaire> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Inventaire>(`${this.apiUrl}/inventaires/`+inventaireid, {headers});
  }else {
      return  new Observable<any>()}}

  createInventaire(newIinventaire: Inventaire): Observable<Inventaire> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Inventaire>(`${this.apiUrl}/inventaires/add`, newIinventaire, {headers});
  }else {
      return  new Observable<any>()}}

  updateInventaire(inventaire: Inventaire): Observable<Inventaire> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Inventaire>(`${this.apiUrl}/inventaires/update/${inventaire.id}`, inventaire, {headers});

  }else {
      return  new Observable<any>()}}

  deleteInventaire(inventaireId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/inventaires/delete/${inventaireId}`, {headers});
  }else {
      return  new Observable<any>()}}

  getProduitFiltre(inventaireId:number): Observable<Produit[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Produit[]>(`${this.apiUrl}/inventaires/${inventaireId}/difference`, {headers});
  }else {
      return  new Observable<any>()}}
}
