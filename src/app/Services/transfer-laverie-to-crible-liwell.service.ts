import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferLaverieToCribleLiwell} from "../Models/transfer-laverie-to-crible-liwell";

@Injectable({
  providedIn: 'root'
})
export class TransferLaverieToCribleLiwellService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferLaverieToCribleLiwell(): Observable<TransferLaverieToCribleLiwell[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferLaverieToCribleLiwell[]>(`${this.apiUrl}/transferLaverieToCribleLiwell/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferLaverieToCribleLiwellById(id:number): Observable<TransferLaverieToCribleLiwell> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferLaverieToCribleLiwell>(`${this.apiUrl}/transferLaverieToCribleLiwell/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferLaverieToCribleLiwell(transferLaverieToCribleLiwellId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferLaverieToCribleLiwell/delete/${transferLaverieToCribleLiwellId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferLaverieToCribleLiwell(transferLaverieToCribleLiwell: TransferLaverieToCribleLiwell): Observable<TransferLaverieToCribleLiwell> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferLaverieToCribleLiwell>(`${this.apiUrl}/transferLaverieToCribleLiwell/update`, transferLaverieToCribleLiwell, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferLaverieToCribleLiwell(transferLaverieToCribleLiwell: TransferLaverieToCribleLiwell, id:number) : Observable<boolean>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<boolean>(`${this.apiUrl}/transferLaverieToCribleLiwell/add/${id}`, transferLaverieToCribleLiwell, {headers});
    }else {
      return  new Observable<any>()}}
}
