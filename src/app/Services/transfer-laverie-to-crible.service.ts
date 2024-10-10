import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";
import {TransferLaverieToCrible} from "../Models/transfer-laverie-to-crible";

@Injectable({
  providedIn: 'root'
})
export class TransferLaverieToCribleService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllTransferLaverieToCrible(): Observable<TransferLaverieToCrible[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferLaverieToCrible[]>(`${this.apiUrl}/transferLaverieToCrible/read`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  getTransferLaverieToCribleById(id:number): Observable<TransferLaverieToCrible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<TransferLaverieToCrible>(`${this.apiUrl}/transferLaverieToCrible/${id}`, {headers}) ;
    }else {
      return  new Observable<any>()}}

  deleteTransferLaverieToCrible(transferLaverieToCribleId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.delete(`${this.apiUrl}/transferLaverieToCrible/delete/${transferLaverieToCribleId}`, {headers});
    }else {
      return  new Observable<any>()}}

  updateTransferLaverieToCrible(transferLaverieToCrible: TransferLaverieToCrible): Observable<TransferLaverieToCrible> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.put<TransferLaverieToCrible>(`${this.apiUrl}/transferLaverieToCrible/update`, transferLaverieToCrible, {headers});
    }else {
      return  new Observable<any>()}}


  addTransferLaverieToCrible(transferLaverieToCrible: TransferLaverieToCrible, id:number) : Observable<boolean>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.post<boolean>(`${this.apiUrl}/transferLaverieToCrible/add/${id}`, transferLaverieToCrible, {headers});
    }else {
      return  new Observable<any>()}}
}
