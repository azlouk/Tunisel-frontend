import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CribleLiwell} from "../Models/cribleLiwell";
import {Sblf} from "../Models/sblf";
import {Bassin} from "../Models/bassin";
import {Sbnl} from "../Models/sbnl";
import {Sbl} from "../Models/sbl";
import {getKeyToken} from "../../main";
import {Puit} from "../Models/puit";
import {Band} from "../Models/band";

@Injectable({
  providedIn: 'root'
})
export class RapportAnalyseService {
  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }


  addRapportToBassin(bassin:Bassin) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/bassin`, bassin, {headers});
  }else {
      return  new Observable<any>()}}

  addRapportToSbnl(sbnl:Sbnl) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/sbnl`, sbnl, {headers});
  }else {
      return  new Observable<any>()}}

  addRapportToSbl(sbl:Sbl) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/sbl`, sbl, {headers});
  }else {
      return  new Observable<any>()}}

  addRapportToSblf(sblf:Sblf) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/sblf`, sblf, {headers});
  }else {
      return  new Observable<any>()}}

  addRapportToCribleLiwell(cribleLiwell:CribleLiwell) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/cribleLiwell`, cribleLiwell, {headers});
  }else {
      return  new Observable<any>()}}
  addRapportToBand(band:Band) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/band`, band, {headers});
    }else {
      return  new Observable<any>()}}
  addRapportToPuit(puit:Puit) : Observable<void>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<void>(`${this.apiUrl}/analysesPhysiques/AddRapport/puit`, puit, {headers});
    }else {
      return  new Observable<any>()}}


}
