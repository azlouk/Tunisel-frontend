import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferToBand} from "../Models/transfer-to-band";

@Injectable({
  providedIn: 'root'
})
export class TransferToBandService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferToBand(): Observable<TransferToBand[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToBand[]>(`${this.apiUrl}/transferToBand/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferToBandById(id:number): Observable<TransferToBand> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToBand>(`${this.apiUrl}/transferToBand/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferToBand(TransferToBandId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferToBand/delete/${TransferToBandId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferToBand(TransferToBand: TransferToBand): Observable<TransferToBand> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferToBand>(`${this.apiUrl}/transferToBand/update`, TransferToBand, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferToBand(TransferToBand: TransferToBand, id:number) : Observable<TransferToBand>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<TransferToBand>(`${this.apiUrl}/transferToBand/add/${id}`, TransferToBand, {headers});
    }else {
      return  new Observable<any>()}}


}
