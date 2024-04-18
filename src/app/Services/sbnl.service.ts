import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {Sbnl} from "../Models/sbnl";
import {JsonPipe} from "@angular/common";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Injectable({
  providedIn: 'root'
})
export class SbnlService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSbnls(): Observable<Sbnl[]> {
    return this.http.get<Sbnl[]>(`${this.apiUrl}/sbnls/read`) ;
  }

  deleteSbnl(sbnlId: number | undefined): Observable<any> {
    console.log(`${this.apiUrl}/puits/${sbnlId}`)
    return this.http.delete(`${this.apiUrl}/sbnls/delete/${sbnlId}`);
  }
  updateSbnl(sbnl: Sbnl): Observable<Sbnl> {
    console.log("update");
    return this.http.put<Sbnl>(`${this.apiUrl}/sbnls/${sbnl.id}`, sbnl);
  }


  addSbnl(sbnl: Sbnl) : Observable<Sbnl>{
    console.log(sbnl)
    const headers = new HttpHeaders().set("Content-Type", "application/json; charset=utf8");


    //console.error(JSON.parse(JSON.stringify(sbnl)));

    return this.http.post<Sbnl>(`${this.apiUrl}/sbnls/add`,JSON.parse(JSON.stringify(sbnl)),{headers});

  }
}
