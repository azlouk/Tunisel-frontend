import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {AnalysesChimique} from "../Models/analyses-chimique";
import { JsonPipe} from "@angular/common";
import {Bassin} from "../Models/bassin";
import {Sbnl} from "../Models/sbnl";
import {Sbl} from "../Models/sbl";
import {Sblf} from "../Models/sblf";

@Injectable({
  providedIn: 'root'
})
export class AnalyseChimiqueService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient , ) { }

  getAllAnalysesChimiques(): Observable<AnalysesChimique[]> {
    return this.http.get<AnalysesChimique[]>(`${this.apiUrl}/analysechimiques/read`) ;
  }

  deleteAnalyseChimique(analysesChimiqueId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/analysechimiques/${analysesChimiqueId}`);
  }
  updateAnalyseChimique(analyse: AnalysesChimique): Observable<AnalysesChimique> {
    console.log("analyse:    "+new JsonPipe().transform(analyse));


    return this.http.put<AnalysesChimique>(`${this.apiUrl}/analysechimiques/update`, analyse);
  }


  addAnalyseChimique(puit: Puit) : Observable<AnalysesChimique>{

    return this.http.put<AnalysesChimique>(`${this.apiUrl}/analysechimiques/Addanalyse/puit`, puit);

  }
  getElementByAnalyseChimiqueId(analyeChimiqueId: number) : Observable<Object[]>{
    return this.http.get<Object[]>(`${this.apiUrl}/analysechimiques/byAnalyseChimique/${analyeChimiqueId}`);
  }
  getAnalyseChimiqueById(analyeChimiqueId: number) : Observable<AnalysesChimique>{
    return this.http.get<AnalysesChimique>(`${this.apiUrl}/analysechimiques/${analyeChimiqueId}`);

  }


 //  =======bassin========
  addAnalyseChimiqueToBassin(bassin:Bassin) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/bassin`, bassin);
  }

  addAnalyseChimiqueToSbnl(sbnl:Sbnl) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/sbnl`, sbnl);
  }
  addAnalyseChimiqueToSbl(sbl:Sbl) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/sbl`, sbl);
  }
  addAnalyseChimiqueToSblf(sblf:Sblf) : Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/sblf`, sblf);
  }

 }

