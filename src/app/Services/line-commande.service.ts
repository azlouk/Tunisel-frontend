import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LineCommande} from "../Models/lineCommande";

@Injectable({
  providedIn: 'root'
})
export class LineCommandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllLineCommande(): Observable<LineCommande[]> {
    return this.http.get<LineCommande[]>(`${this.apiUrl}/lineCommandes/read`) ;
  }

  getLineCommandeById(lineCommandeId:number): Observable<LineCommande> {
    return this.http.get<LineCommande>(`${this.apiUrl}/lineCommandes/`+lineCommandeId);
  }
  deleteLineCommande(lineCommandeId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/ligneCommandes/delete/${lineCommandeId}`);
  }
  updateLineCommande(lineCommande: LineCommande): Observable<LineCommande> {
    return this.http.put<LineCommande>(`${this.apiUrl}/ligneCommandes/update`, lineCommande);
  }


  addLineCommande(lineCommande: LineCommande) : Observable<LineCommande>{
    return this.http.post<LineCommande>(`${this.apiUrl}/ligneCommandes/add`,lineCommande);

  }
}
