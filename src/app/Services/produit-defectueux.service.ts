import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitDefectueux} from "../Models/produitDefectueux";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ProduitDefectueuxService {



  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllProduitsDefectueux(): Observable<ProduitDefectueux[]> {
    return this.http.get<ProduitDefectueux[]>(`${this.apiUrl}/produitsDefectueux/read`);
  }

  getProduitDefectueuxById(id: number): Observable<ProduitDefectueux> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProduitDefectueux>(url);
  }

  createProduitDefectueux(produitDefectueux: ProduitDefectueux): Observable<ProduitDefectueux> {
    return this.http.post<ProduitDefectueux>(this.apiUrl, produitDefectueux);
  }

  updateProduitDefectueux(produitDefectueux: ProduitDefectueux): Observable<ProduitDefectueux> {
    const url = `${this.apiUrl}/${produitDefectueux.id}`;
    return this.http.put<ProduitDefectueux>(url, produitDefectueux);
  }

  deleteProduitDefectueux(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}


