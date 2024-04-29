import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JsonPipe} from "@angular/common";
import {Puit} from "../Models/puit";
import {Bassin} from "../Models/bassin";
import {Sbnl} from "../Models/sbnl";
import {Sbl} from "../Models/sbl";
import {Sblf} from "../Models/sblf";
import {AnalysesPhysique} from "../Models/analyses-physique";

@Injectable({
  providedIn: 'root'
})
export class AnalysePhysiqueService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllAnalysesPhysiques(): Observable<AnalysesPhysique[]> {
    return this.http.get<AnalysesPhysique[]>(`${this.apiUrl}/analysesPhysiques/read`) ;
  }

  deleteAnalysesPhysiques(analysesPhysiqueId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/analysesPhysiques/${analysesPhysiqueId}`);
  }
  updateAnalysesPhysiques(analyse: AnalysesPhysique): Observable<AnalysesPhysique> {
    console.log("analyse:    "+new JsonPipe().transform(analyse));
    return this.http.put<AnalysesPhysique>(`${this.apiUrl}/analysesPhysiques/update`, analyse);
  }



  getElementByAnalysesPhysiquesId(analyeChimiqueId: number) : Observable<Object[]>{
    return this.http.get<Object[]>(`${this.apiUrl}/analysesPhysiques/byAnalysePhysique/${analyeChimiqueId}`);
  }
  getAnalysesPhysiquesById(analyeChimiqueId: number) : Observable<AnalysesPhysique>{
    return this.http.get<AnalysesPhysique>(`${this.apiUrl}/analysesPhysiques/${analyeChimiqueId}`);

  }


  //  =======bassin========
  addAnalysesPhysiquesToBassin(bassin:Bassin) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/bassin`, bassin);
  }

  addAnalysesPhysiquesToSbnl(sbnl:Sbnl) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/sbnl`, sbnl);
  }
  addAnalysesPhysiquesToSbl(sbl:Sbl) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/sbl`, sbl);
  }
  addAnalysesPhysiquesToSblf(sblf:Sblf) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/sblf`, sblf);
  }

}
