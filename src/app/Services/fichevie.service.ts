import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FicheVie} from "../Models/fichevie";
import {environment} from "../environment/environment";
import {Bassin} from "../Models/bassin";


@Injectable({
  providedIn: 'root'
})
export class FicheVieService {

  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}

  getFichesVies(): Observable<FicheVie[]> {
    return this.http.get<FicheVie[]>(`${this.apiUrl}/fichesvies/read`);
  }  getFicheById(ficheid:number): Observable<FicheVie> {
    return this.http.get<FicheVie>(`${this.apiUrl}/fichesvies/`+ficheid);
  }

  createFicheVie(ficheVie: FicheVie): Observable<FicheVie> {
    return this.http.post<FicheVie>(`${this.apiUrl}/fichesvies/add`, ficheVie);
  }

  updateFicheVie(ficheVie: FicheVie): Observable<FicheVie> {
    return this.http.put<FicheVie>(`${this.apiUrl}/fichesvies/update`, ficheVie);

  }

  deleteFicheVie(ficheVieId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fichesvies/delete/${ficheVieId}`);
  }
}

