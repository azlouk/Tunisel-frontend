import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {Sblf} from "../Models/sblf";

@Injectable({
  providedIn: 'root'
})
export class SblfService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllSblfs(): Observable<Sblf[]> {
    return this.http.get<Sblf[]>(`${this.apiUrl}/sblfs/read`) ;
  }

  deleteSblf(sblfId: number | undefined): Observable<any> {

    return this.http.delete(`${this.apiUrl}/sblfs/delete/${sblfId}`);
  }
  updateSblf(sblf: Sblf): Observable<Sblf> {
    return this.http.put<Sblf>(`${this.apiUrl}/sblfs/${sblf.id}`, sblf);
  }


  addSblf(sblf: Sblf) : Observable<Sblf>{


    return this.http.post<Sblf>(`${this.apiUrl}/sblfs/add`,sblf);

  }
}
