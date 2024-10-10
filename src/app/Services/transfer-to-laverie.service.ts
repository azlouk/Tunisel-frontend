import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferToLaverie} from "../Models/transfer-to-laverie";

@Injectable({
  providedIn: 'root'
})
export class TransferToLaverieService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferToLaverie(): Observable<TransferToLaverie[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToLaverie[]>(`${this.apiUrl}/transferToLaverie/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferToLaverieById(id:number): Observable<TransferToLaverie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToLaverie>(`${this.apiUrl}/transferToLaverie/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferToLaverie(transferToLaverieId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferToLaverie/delete/${transferToLaverieId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferToLaverie(transferToLaverie: TransferToLaverie): Observable<TransferToLaverie> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferToLaverie>(`${this.apiUrl}/transferToLaverie/update`, transferToLaverie, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferToLaverie(transferToLaverie: TransferToLaverie, id:number) : Observable<TransferToLaverie>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<TransferToLaverie>(`${this.apiUrl}/transferToLaverie/add/${id}`, transferToLaverie, {headers});
    }else {
      return  new Observable<any>()}}
}
