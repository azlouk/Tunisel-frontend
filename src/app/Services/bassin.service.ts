import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../Models/user";
import {Bassin} from "../Models/bassin";

@Injectable({
  providedIn: 'root'
})
export class BassinService {

apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllBassins(): Observable<Bassin[]> {
    return this.http.get<Bassin[]>(`${this.apiUrl}/bassins/read`);
  }
 // getAllBassinsDTO(): Observable<Bassin[]> {
 //    return this.http.get<Bassin[]>(`${this.apiUrl}/bassins/readDTO`);
 //  }




  deleteBassin(bassinId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bassins/delete/${bassinId}`);
  }

  updateBassin(bassin: Bassin): Observable<Bassin> {
    return this.http.put<Bassin>(`${this.apiUrl}/bassins/${bassin.id}`, bassin);
  }


  addBassin(bassin: Bassin) : Observable<Bassin>{
    return this.http.post<Bassin>(`${this.apiUrl}/bassins/add`, bassin);
  }



}
