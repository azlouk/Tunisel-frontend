import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bande} from "../Models/bande";

@Injectable({
  providedIn: 'root'
})
export class BandeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllBandes(): Observable<Bande[]> {
    return this.http.get<Bande[]>(`${this.apiUrl}/bandes/read`) ;
  }

  deleteBande(bandeId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bandes/delete/${bandeId}`);
  }
  updateBande(bande: Bande): Observable<Bande> {
    console.log("update");
    return this.http.put<Bande>(`${this.apiUrl}/bandes/${bande.id}`, bande);
  }


  addBande(bande: Bande) : Observable<Bande>{
    console.log(bande)
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Bande>(`${this.apiUrl}/bandes/add`,JSON.parse(JSON.stringify(bande)),{headers});

  }
}
