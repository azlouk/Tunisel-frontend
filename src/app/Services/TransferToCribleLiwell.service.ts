import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferToCribleLiwell} from "../Models/TransferToCribleLiwell";

@Injectable({
  providedIn: 'root'
})
export class TransferToCribleLiwellService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferToCribleLiwell(): Observable<TransferToCribleLiwell[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToCribleLiwell[]>(`${this.apiUrl}/transferToCribleLiwell/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferToCribleLiwellById(id:number): Observable<TransferToCribleLiwell> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferToCribleLiwell>(`${this.apiUrl}/transferToCribleLiwell/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferToCribleLiwell(transferToCribleLiwellId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferToCribleLiwell/delete/${transferToCribleLiwellId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferToCribleLiwell(transferToCribleLiwell: TransferToCribleLiwell): Observable<TransferToCribleLiwell> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferToCribleLiwell>(`${this.apiUrl}/transferToCribleLiwell/update`, transferToCribleLiwell, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferToCribleLiwell(transferToCribleLiwell: TransferToCribleLiwell, id:number) : Observable<TransferToCribleLiwell>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<TransferToCribleLiwell>(`${this.apiUrl}/transferToCribleLiwell/add/${id}`, transferToCribleLiwell, {headers});
    }else {
      return  new Observable<any>()}}


}
