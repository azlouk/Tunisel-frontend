import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferLaverieToWashed} from "../Models/transfer-laverie-to-washed";

@Injectable({
  providedIn: 'root'
})
export class TransferLaverieToWashedService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferLaverieToWashed(): Observable<TransferLaverieToWashed[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferLaverieToWashed[]>(`${this.apiUrl}/transferLaverieToWashed/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferLaverieToWashedById(id:number): Observable<TransferLaverieToWashed> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferLaverieToWashed>(`${this.apiUrl}/transferLaverieToWashed/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferLaverieToWashed(transferLaverieToWashedId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferLaverieToWashed/delete/${transferLaverieToWashedId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferLaverieToWashed(transferLaverieToWashed: TransferLaverieToWashed): Observable<TransferLaverieToWashed> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferLaverieToWashed>(`${this.apiUrl}/transferLaverieToWashed/update`, transferLaverieToWashed, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferLaverieToWashed(transferLaverieToWashed: TransferLaverieToWashed, id:number) : Observable<boolean>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<boolean>(`${this.apiUrl}/transferLaverieToWashed/add/${id}`, transferLaverieToWashed, {headers});
    }else {
      return  new Observable<any>()}}
}
