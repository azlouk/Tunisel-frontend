import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {Puit} from "../Models/puit";

@Injectable({
  providedIn: 'root'
})
export class PuitService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllPuits(): Observable<Puit[]> {
    return this.http.get<Puit[]>(`${this.apiUrl}/puits/read`) ;
  }

  deletePuit(puitId: number | undefined): Observable<any> {
    console.log(`${this.apiUrl}/puits/${puitId}`)
    return this.http.delete(`${this.apiUrl}/puits/${puitId}`);
  }
  updatePuit(puit: Puit): Observable<Puit> {
    console.log("update");
    return this.http.put<Puit>(`${this.apiUrl}/puits/${puit.id}`, puit);
  }


  addPuit(puit: Puit) : Observable<Puit>{

    return this.http.post<Puit>(`${this.apiUrl}/puits`, puit);

  }



}
