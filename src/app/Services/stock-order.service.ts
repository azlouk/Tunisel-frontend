import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockOrder} from "../Models/stock-order";
import {Saline} from "../Models/saline";
import {getKeyToken} from "../../main";
import {LoginService} from "./login.service";
import {JsonPipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class StockOrderService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllStockOrder(): Observable<StockOrder[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<StockOrder[]>(`${this.apiUrl}/stockOrders/read`, {headers}) ;
  }else {
      return  new Observable<any>()}}

  getAllStockOrderDTO(): Observable<StockOrder[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<StockOrder[]>(`${this.apiUrl}/stockOrders/readDTO`, {headers}) ;
  }else {
      return  new Observable<any>()}}
  getAllStockOrderDTORead(): Observable<StockOrder[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<StockOrder[]>(`${this.apiUrl}/stockOrders/readDTOForCommande`, {headers}) ;
    }else {
      return  new Observable<any>()}}
  deleteStockOrder(stockOrderId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/stockOrders/delete/${stockOrderId}`, {headers});
  }else {
      return  new Observable<any>()}}

  updateStockOrder(stockOrder: StockOrder): Observable<StockOrder> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<StockOrder>(`${this.apiUrl}/stockOrders/update`, stockOrder, {headers});
  }else {
      return  new Observable<any>()}}


  addStockOrder(stockOrder: StockOrder) : Observable<StockOrder>{
    console.log("----> :"+new JsonPipe().transform(stockOrder))
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<StockOrder>(`${this.apiUrl}/stockOrders/add`, stockOrder, {headers});
  }else {
      return  new Observable<any>()}}

  getSalinesByStockOrder(stockOrderId: number) : Observable<Saline[]>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Saline[]>(`${this.apiUrl}/stockOrders/saline/${stockOrderId}`, {headers} );
  }else {
      return  new Observable<any>()}}

  getStockOrderById(id:number):Observable<StockOrder>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<StockOrder>(`${this.apiUrl}/stockOrders/${id}` , {headers});
  }else {
      return  new Observable<any>()}}
}
