import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineCommande} from "../Models/lineCommande";
import {Commande} from "../Models/commande";
import {Produit} from "../Models/produit";
import {StockOrder} from "../Models/stock-order";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<Commande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getCommandesByStockOrderAndEtatContains(stockOrderId: number, etat: string): Observable<Commande[]> {
    const params = new HttpParams().set('etat', etat);

    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/stockOrder/${stockOrderId}`, { params });
  }

  getAllCommandeDTO(): Observable<Commande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getCommandeById(commandeId:number): Observable<Commande> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Commande>(`${this.apiUrl}/commandes/${commandeId}`, {headers});
  }else {
      return  new Observable<any>()}}

  deleteCommande(CommandeId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/commandes/delete/${CommandeId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateCommande(commande: Commande): Observable<Commande> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Commande>(`${this.apiUrl}/commandes/update`, commande, {headers});
  }else {
      return  new Observable<any>()}}


  addCommande(commande: Commande) : Observable<Commande>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");

    return this.http.post<Commande>(`${this.apiUrl}/commandes/add`,commande, {headers});

  }else {
      return  new Observable<any>()}}


  getLignesCommandesBassin(bassinId:number): Observable<LineCommande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesBassin/${bassinId}`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getLignesCommandesSbnl(sbnlId:number): Observable<LineCommande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesSbnl/${sbnlId}`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getLignesCommandesSbl(sblId:number): Observable<LineCommande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesSbl/${sblId}`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getLignesCommandesSblf(sblfId:number): Observable<LineCommande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesSblf/${sblfId}`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getLignesCommandesBande(bandeId:number): Observable<LineCommande[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesBande/${bandeId}`, {headers}) ;
  }else {
      return  new Observable<any>()}}
}
