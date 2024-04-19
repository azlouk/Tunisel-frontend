import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dashboard} from "../Models/Dashboard";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl=environment.apiUrl



  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/dashboard/data`);
  }
}
