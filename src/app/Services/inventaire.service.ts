import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Inventaire} from "../Models/inventaire";


@Injectable({
  providedIn: 'root'
})
export class InventaireService {
  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getInventaires(): Observable<Inventaire[]> {
    return this.http.get<Inventaire[]>(`${this.apiUrl}/inventaires/read`);
  }
  getInventaireById(inventaireid:number): Observable<Inventaire> {
    return this.http.get<Inventaire>(`${this.apiUrl}/inventaires/`+inventaireid);
  }

  createInventaire(newIinventaire: Inventaire): Observable<Inventaire> {
    return this.http.post<Inventaire>(`${this.apiUrl}/inventaires/add`, newIinventaire);
  }

  updateInventaire(inventaire: Inventaire): Observable<Inventaire> {
    return this.http.put<Inventaire>(`${this.apiUrl}/inventaires/${inventaire.id}`, inventaire);

  }

  deleteInventaire(inventaireId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/inventaires/delete/${inventaireId}`);
  }
}
