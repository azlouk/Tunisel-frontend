import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineCommande} from "../Models/lineCommande";
import {Commande} from "../Models/commande";
import {Produit} from "../Models/produit";
import {StockOrder} from "../Models/stock-order";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/read`) ;
  }
  getCommandesByStockOrderAndEtatContains(stockOrderId: number, etat: string): Observable<Commande[]> {
    const params = new HttpParams().set('etat', etat);

    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/stockOrder/${stockOrderId}`, { params });
  }

  getAllCommandeDTO(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/readDTO`) ;
  }
  getCommandeById(commandeId:number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/commandes/`+commandeId);
  }
  deleteCommande(CommandeId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/commandes/delete/${CommandeId}`);
  }
  updateCommande(commande: Commande): Observable<Commande> {

    return this.http.put<Commande>(`${this.apiUrl}/commandes/update`, commande);
  }


  addCommande(commande: Commande) : Observable<Commande>{

    return this.http.post<Commande>(`${this.apiUrl}/commandes/add`,commande);

  }


  getLignesCommandesBassin(bassinId:number): Observable<LineCommande[]> {
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesBassin/${bassinId}`) ;
  }

  getLignesCommandesSbnl(sbnlId:number): Observable<LineCommande[]> {
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesSbnl/${sbnlId}`) ;
  }

  getLignesCommandesSbl(sblId:number): Observable<LineCommande[]> {
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesSbl/${sblId}`) ;
  }
  getLignesCommandesSblf(sblfId:number): Observable<LineCommande[]> {
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesSblf/${sblfId}`) ;
  }

  getLignesCommandesBande(bandeId:number): Observable<LineCommande[]> {
    return this.http.get<LineCommande[]>(`${this.apiUrl}/commandes/linesCommandesBande/${bandeId}`) ;
  }
}
