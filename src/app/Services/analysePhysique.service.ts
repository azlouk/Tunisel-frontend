import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bassin} from "../Models/bassin";
import {Sbnl} from "../Models/sbnl";
import {Sbl} from "../Models/sbl";
import {Sblf} from "../Models/sblf";
import {AnalysesPhysique} from "../Models/analyses-physique";
import {CribleLiwell} from "../Models/cribleLiwell";
import {getKeyToken} from "../../main";
import {Band} from "../Models/band";

@Injectable({
  providedIn: 'root'
})
export class AnalysePhysiqueService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllAnalysesPhysiques(): Observable<AnalysesPhysique[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<AnalysesPhysique[]>(`${this.apiUrl}/analysesPhysiques/read`, {headers}) ;
  }else {
      return  new Observable<any[]>()}}

  deleteAnalysesPhysiques(analysesPhysiqueId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");

    return this.http.delete(`${this.apiUrl}/analysesPhysiques/${analysesPhysiqueId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateAnalysesPhysiques(analyse: AnalysesPhysique, id:number, ref:string): Observable<AnalysesPhysique> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    const params = new HttpParams().set('id', id.toString()).set('ref', ref);
      const httpOptions = {
        headers: headers,
        params: params
      };
    return this.http.put<AnalysesPhysique>(`${this.apiUrl}/analysesPhysiques/update`, analyse,httpOptions);
  }else {
      return  new Observable<any>()}}



  getElementByAnalysesPhysiquesId(analyeChimiqueId: number) : Observable<Object[]>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Object[]>(`${this.apiUrl}/analysesPhysiques/byAnalysePhysique/${analyeChimiqueId}`, {headers});
  }else {
      return  new Observable<any>()}}
  getAnalysesPhysiquesById(analyeChimiqueId: number) : Observable<AnalysesPhysique>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<AnalysesPhysique>(`${this.apiUrl}/analysesPhysiques/${analyeChimiqueId}`, {headers});

  }else {
      return  new Observable<any>()}}


  //  =======bassin========
  addAnalysesPhysiquesToBassin(bassin:Bassin) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/bassin`, bassin, {headers});
  }else {
      return  new Observable<any>()}}

  addAnalysesPhysiquesToSbnl(sbnl:Sbnl) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/sbnl`, sbnl, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalysesPhysiquesToCribleLiwell(cribleLiwell:CribleLiwell) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/cribleLiwell`, cribleLiwell, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalysesPhysiquesToSbl(sbl:Sbl) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/sbl`, sbl, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalysesPhysiquesToSblf(sblf:Sblf) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/sblf`, sblf, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalysesPhysiquesToBand(band:Band) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddanalysePhysique/band`, band, {headers});
    }else {
      return  new Observable<any>()}}

}
