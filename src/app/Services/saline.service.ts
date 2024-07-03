import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Saline} from "../Models/saline";

@Injectable({
  providedIn: 'root'
})
export class SalineService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSaline(): Observable<Saline[]> {
    return this.http.get<Saline[]>(`${this.apiUrl}/salines/read`) ;
  }


  deleteSaline(SalineId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/salines/delete/${SalineId}`);
  }
  updateSaline(Saline: Saline): Observable<Saline> {
    return this.http.put<Saline>(`${this.apiUrl}/salines/update`, Saline);
  }


  addSaline(Saline: Saline,id:number) : Observable<Saline>{
    return this.http.post<Saline>(`${this.apiUrl}/salines/add/${id}`, Saline);
  }
}
