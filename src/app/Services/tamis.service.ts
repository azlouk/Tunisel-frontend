import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TamisService {

  apiUrl=environment.apiUrl

  constructor(private http: HttpClient) {}
  deleteTamis(tamisId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tamis/delete/${tamisId}`);
  }

  getDistinctCalibres(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/tamis/allCalibres`);
  }
}
