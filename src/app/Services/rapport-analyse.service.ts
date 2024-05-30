import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bande} from "../Models/bande";
import {Sblf} from "../Models/sblf";
import {Bassin} from "../Models/bassin";
import {Sbnl} from "../Models/sbnl";
import {Sbl} from "../Models/sbl";

@Injectable({
  providedIn: 'root'
})
export class RapportAnalyseService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }


  addRapportToBassin(bassin:Bassin) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/bassin`, bassin);
  }
  addRapportToSbnl(sbnl:Sbnl) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/sbnl`, sbnl);
  }
  addRapportToSbl(sbl:Sbl) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/sbl`, sbl);
  }
  addRapportToSblf(sblf:Sblf) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/sblf`, sblf);
  }
  addRapportToBande(bande:Bande) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/bande`, bande);
  }




}
