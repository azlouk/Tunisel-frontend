import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Band} from "../Models/band";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})
export class BandService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }
  getAllBands(): Observable<Band[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<Band[]>(`${this.apiUrl}/bands/read`, {headers});
    }else {
      return  new Observable<any>()}}



  getBandById(id: number): Observable<Band> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const url = `${this.apiUrl}/bands/${id}`;
      return this.http.get<Band>(url, {headers});
    }else {
      return  new Observable<any>()}}

  addBand(band: Band) : Observable<Band>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<Band>(`${this.apiUrl}/bands/add`, band, {headers});
    }else {
      return  new Observable<any>()}}

  updateBand(band: Band): Observable<Band> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<Band>(`${this.apiUrl}/bands/update`, band, {headers});
    }else {
      return  new Observable<any>()}}

  deleteBand(bandId: number |undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/bands/delete/${bandId}`, {headers});
    }else {
      return  new Observable<any>()}}
}
