import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineCommande} from "../Models/lineCommande";
import {Commande} from "../Models/commande";
import {Produit} from "../Models/produit";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllCommande(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/commandes/read`) ;
  }
  getCommandeById(commandeId:number): Observable<Commande> {
    return this.http.get<Commande>(`${this.apiUrl}/lineCommandes/`+commandeId);
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
}
