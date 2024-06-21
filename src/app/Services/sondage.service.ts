import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sondage} from "../Models/sondage";

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSondage(): Observable<Sondage[]> {
    return this.http.get<Sondage[]>(`${this.apiUrl}/sondages/read`) ;
  }


  deleteSondage(sondageId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sondages/delete/${sondageId}`);
  }
  updateSondage(sondage: Sondage): Observable<Sondage> {
    return this.http.put<Sondage>(`${this.apiUrl}/sondages/update`, sondage);
  }


  addSondage(sondage: Sondage, id:number) : Observable<Sondage>{
    return this.http.post<Sondage>(`${this.apiUrl}/sondages/add/${id}`, sondage);
  }

}
