import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recolte} from "../Models/recolte";

@Injectable({
  providedIn: 'root'
})
export class RecolteService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllRecolte(): Observable<Recolte[]> {
    return this.http.get<Recolte[]>(`${this.apiUrl}/recoltes/read`) ;
  }


  deleteRecolte(RecolteId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/recoltes/delete/${RecolteId}`);
  }
  updateRecolte(Recolte: Recolte): Observable<Recolte> {
    return this.http.put<Recolte>(`${this.apiUrl}/recoltes/update`, Recolte);
  }


  addRecolte(Recolte: Recolte, id:number) : Observable<Recolte>{
    return this.http.post<Recolte>(`${this.apiUrl}/recoltes/add/${id}`, Recolte);
  }
  getSumRecoltePerMonthByBassinIdsAndYear( year:number,bassinsId:number[]) : Observable<Object[]>{
    return this.http.post<Object[]>(`${this.apiUrl}/recoltes/sum-per-month/${year}`, bassinsId);
  }
}
