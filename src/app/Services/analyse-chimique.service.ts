import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Puit} from "../Models/puit";
import {AnalysesChimique} from "../Models/analyses-chimique";
import {Bassin} from "../Models/bassin";
import {Sbnl} from "../Models/sbnl";
import {Sbl} from "../Models/sbl";
import {Sblf} from "../Models/sblf";
import {Bande} from "../Models/bande";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class AnalyseChimiqueService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient , ) { }

  getAllAnalysesChimiques(): Observable<AnalysesChimique[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<AnalysesChimique[]>(`${this.apiUrl}/analysechimiques/read`, {headers}) ;
  }else {
      return  new Observable<any[]>()}}

  deleteAnalyseChimique(analysesChimiqueId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/analysechimiques/${analysesChimiqueId}`, {headers});
  }else {
      return  new Observable<any>()}}
  updateAnalyseChimique(analyse: AnalysesChimique, id: number, ref: string): Observable<AnalysesChimique> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      const params = new HttpParams()
        .set('id', id.toString())
        .set('ref', ref);

      const httpOptions = {
        headers: headers,
        params: params
      };

      return this.http.put<AnalysesChimique>(`${this.apiUrl}/analysechimiques/update`, analyse, httpOptions);
    }else {
      return  new Observable<any>()}
  }



  addAnalyseChimique(puit: Puit) : Observable<AnalysesChimique>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<AnalysesChimique>(`${this.apiUrl}/analysechimiques/Addanalyse/puit`, puit, {headers});

  }else {
      return  new Observable<any>()}}
  getElementByAnalyseChimiqueId(analyeChimiqueId: number) : Observable<Object[]>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Object[]>(`${this.apiUrl}/analysechimiques/byAnalyseChimique/${analyeChimiqueId}`, {headers});
  }else {
      return  new Observable<any[]>()}}
  getAnalyseChimiqueById(analyeChimiqueId: number) : Observable<AnalysesChimique>{const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<AnalysesChimique>(`${this.apiUrl}/analysechimiques/${analyeChimiqueId}`, {headers});

  }else {
      return  new Observable<any>()}}


 //  =======bassin========
  addAnalyseChimiqueToBassin(bassin:Bassin) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/bassin`, bassin, {headers});
  }else {
      return  new Observable<any>()}}

  addAnalyseChimiqueToSbnl(sbnl:Sbnl) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/sbnl`, sbnl, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalyseChimiqueToBande(bande:Bande) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/bande`, bande, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalyseChimiqueToSbl(sbl:Sbl) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/sbl`, sbl, {headers});
  }else {
      return  new Observable<any>()}}
  addAnalyseChimiqueToSblf(sblf:Sblf) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysechimiques/Addanalyse/sblf`, sblf, {headers});
  }else {
      return  new Observable<any>()}}

 }

