import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {DateDaily} from "../Models/date-daily";

@Injectable({
  providedIn: 'root'
})
export class DailyUpdateService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
  }

  getDataByDay(month: number, year: number): Observable<DateDaily[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');

      const params = new HttpParams()
        .set('month', month.toString())
        .set('year', year.toString());

      return this.http.get<DateDaily[]>(`${this.apiUrl}/dailyUpdates`, {headers, params});
    } else {
      return new Observable<DateDaily[]>();
    }
  }
}
