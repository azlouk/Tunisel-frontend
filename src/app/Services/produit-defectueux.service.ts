import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitDefectueux} from "../Models/produitDefectueux";
import {environment} from "../environment/environment";
import {JsonPipe} from "@angular/common";

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
    const url = `${this.apiUrl}/produitsDefectueux/${id}`;
    return this.http.get<ProduitDefectueux>(url);
  }

  createProduitDefectueux(produitDefectueux: ProduitDefectueux): Observable<ProduitDefectueux> {
    console.log("produitDefectueux log",produitDefectueux,produitDefectueux.quantiteDefectueux);

    return this.http.post<ProduitDefectueux>(`${this.apiUrl}/produitsDefectueux/add`, produitDefectueux);
  }

  updateProduitDefectueux(produitDefectueux: ProduitDefectueux): Observable<ProduitDefectueux> {
    const url = `${this.apiUrl}/produitsDefectueux/update/${produitDefectueux.id}`;
    return this.http.put<ProduitDefectueux>(url, produitDefectueux);
  }

  deleteProduitDefectueux(id: number| undefined): Observable<void> {
    const url = `${this.apiUrl}/produitsDefectueux/delete/${id}`;
    return this.http.delete<void>(url);
  }
}


