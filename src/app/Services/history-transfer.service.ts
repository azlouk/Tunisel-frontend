import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HistoryTransfer} from "../Models/history-transfer";
import {getKeyToken} from "../../main";


@Injectable({
  providedIn: 'root'
})
export class HistoryTransferService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllHistoryTransfer(): Observable<HistoryTransfer[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<HistoryTransfer[]>(`${this.apiUrl}/historyTransfer/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}


  deleteHistoryTransfer(HistoryTransferId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/historyTransfer/delete/${HistoryTransferId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateHistoryTransfer(HistoryTransfer: HistoryTransfer): Observable<HistoryTransfer> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<HistoryTransfer>(`${this.apiUrl}/historyTransfer/update`, HistoryTransfer, {headers});
  }else {
      return  new Observable<any>()}}


  addHistoryTransfer(HistoryTransfer: HistoryTransfer) : Observable<HistoryTransfer>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<HistoryTransfer>(`${this.apiUrl}/historyTransfer/add`, HistoryTransfer, {headers});
  }else {
      return  new Observable<any>()}}
}
