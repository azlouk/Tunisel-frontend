import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {Sbl} from "../Models/sbl";
import {JsonPipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SblService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSbl(): Observable<Sbl[]> {
    return this.http.get<Sbl[]>(`${this.apiUrl}/sbls/read`) ;
  }
  getAllSblDTO(): Observable<Sbl[]> {
    return this.http.get<Sbl[]>(`${this.apiUrl}/sbls/readDTO`) ;
  }

  deleteSbl(sblId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/sbls/delete/${sblId}`);
  }
  updateSbl(sbl: Sbl): Observable<Sbl> {
    return this.http.put<Sbl>(`${this.apiUrl}/sbls/${sbl.id}`, sbl);
  }


  addSbl(sbl: Sbl) : Observable<Sbl>{
    return this.http.post<Sbl>(`${this.apiUrl}/sbls/add`, sbl);

  }



}
