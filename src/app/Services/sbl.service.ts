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

  deleteSbl(sblId: number | undefined): Observable<any> {
    console.log(`${this.apiUrl}/sbls/${sblId}`)
    return this.http.delete(`${this.apiUrl}/sbls/delete/${sblId}`);
  }
  updateSbl(sbl: Sbl): Observable<Sbl> {
    console.log("update");
    return this.http.put<Sbl>(`${this.apiUrl}/sbls/${sbl.id}`, sbl);
  }


  addSbl(sbl: Sbl) : Observable<Sbl>{
    alert(new JsonPipe().transform(sbl))
    alert(new JsonPipe().transform(this.http.post<Sbl>(`${this.apiUrl}/sbls/add`, sbl)))

    return this.http.post<Sbl>(`${this.apiUrl}/sbls/add`, sbl);

  }



}
