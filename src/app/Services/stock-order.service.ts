import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StockOrder} from "../Models/stock-order";
import {Saline} from "../Models/saline";

@Injectable({
  providedIn: 'root'
})
export class StockOrderService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllStockOrder(): Observable<StockOrder[]> {
    return this.http.get<StockOrder[]>(`${this.apiUrl}/stockOrders/read`) ;
  }
  getAllStockOrderDTO(): Observable<StockOrder[]> {
    return this.http.get<StockOrder[]>(`${this.apiUrl}/stockOrders/readDTO`) ;
  }

  deleteStockOrder(stockOrderId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/stockOrders/delete/${stockOrderId}`);
  }
  updateStockOrder(stockOrder: StockOrder): Observable<StockOrder> {
    return this.http.put<StockOrder>(`${this.apiUrl}/stockOrders/update`, stockOrder);
  }


  addStockOrder(stockOrder: StockOrder) : Observable<StockOrder>{
    return this.http.post<StockOrder>(`${this.apiUrl}/stockOrders/add`, stockOrder);
  }
  getSalinesByStockOrder(stockOrderId: number) : Observable<Saline[]>{
    return this.http.get<Saline[]>(`${this.apiUrl}/stockOrders/saline/${stockOrderId}` );
  }

}
