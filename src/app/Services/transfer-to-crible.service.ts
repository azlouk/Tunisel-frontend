import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferToCrible} from "../Models/transfer-to-crible";

@Injectable({
  providedIn: 'root'
})
export class TransferToCribleService {



  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferToCrible(): Observable<TransferToCrible[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToCrible[]>(`${this.apiUrl}/transferToCrible/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferToCribleById(id:number): Observable<TransferToCrible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToCrible>(`${this.apiUrl}/transferToCrible/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferToCrible(transferToCribleId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferToCrible/delete/${transferToCribleId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferToCrible(transferToCrible: TransferToCrible): Observable<TransferToCrible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferToCrible>(`${this.apiUrl}/transferToCrible/update`, transferToCrible, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferToCrible(transferToCrible: TransferToCrible, id:number) : Observable<boolean>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<boolean>(`${this.apiUrl}/transferToCrible/add/${id}`, transferToCrible, {headers});
    }else {
      return  new Observable<any>()}}
}
