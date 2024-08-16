import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TraitementStock} from "../Models/traitement-stock";

@Injectable({
  providedIn: 'root'
})
export class TraitementStockService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTraitementStock(): Observable<TraitementStock[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TraitementStock[]>(`${this.apiUrl}/traitementStock/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTraitementStockById(id:number): Observable<TraitementStock> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TraitementStock>(`${this.apiUrl}/traitementStock/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTraitementStock(TraitementStockId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/traitementStock/delete/${TraitementStockId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTraitementStock(traitementStock: TraitementStock): Observable<TraitementStock> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TraitementStock>(`${this.apiUrl}/traitementStock/update`, traitementStock, {headers});
    }else {
      return  new Observable<any>()}}


  addTraitementStock(traitementStock: TraitementStock, id:number) : Observable<TraitementStock>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<TraitementStock>(`${this.apiUrl}/traitementStock/add/${id}`, traitementStock, {headers});
    }else {
      return  new Observable<any>()}}


}
