import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dashboard} from "../Models/Dashboard";
import {environment} from "../environment/environment";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl=environment.apiUrl



  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<Dashboard> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Dashboard>(`${this.apiUrl}/dashboard/data`, {headers});
  }else {
      return  new Observable<any>()}

  }

  getCountTotalAnalysesChimiques(): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques`, {headers});
  }else {
      return  new Observable<any[]>()}
  }


  getCountAnalyseChemiqueBassin(): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-bassin`, {headers});
  }else {
      return  new Observable<any[]>()}
  }
}
