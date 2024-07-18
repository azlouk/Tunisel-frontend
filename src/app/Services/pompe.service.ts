import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pompe} from "../Models/pompe";

@Injectable({
  providedIn: 'root'
})
export class PompeService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllPompes(): Observable<Pompe[]> {
    return this.http.get<Pompe[]>(`${this.apiUrl}/pompes/read`) ;
  }


  deletePompe(PompeId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pompes/delete/${PompeId}`);
  }
  updatePompe(pompe: Pompe): Observable<Pompe> {
    return this.http.put<Pompe>(`${this.apiUrl}/pompes/update`, pompe);
  }


  addPompe(pompe: Pompe) : Observable<Pompe>{
    return this.http.post<Pompe>(`${this.apiUrl}/pompes/add`, pompe);
  }
}
