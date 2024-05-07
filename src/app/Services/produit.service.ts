import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "../Models/produit";




@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/produits/read`);
  }
  getProduitById(produitid:number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/produits/`+produitid);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/produits/add`, produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/produits/update/${produit.id}`, produit);

  }

  deleteProduit(produitId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/produits/delete/${produitId}`);
  }



}
