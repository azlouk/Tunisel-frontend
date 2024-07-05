import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HistoryTransfer} from "../Models/history-transfer";


@Injectable({
  providedIn: 'root'
})
export class HistoryTransferService {


  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }

  getAllHistoryTransfer(): Observable<HistoryTransfer[]> {
    return this.http.get<HistoryTransfer[]>(`${this.apiUrl}/historyTransfer/read`) ;
  }


  deleteHistoryTransfer(HistoryTransferId: number | undefined): Observable<any> {

    return this.http.delete(`${this.apiUrl}/historyTransfer/delete/${HistoryTransferId}`);
  }
  updateHistoryTransfer(HistoryTransfer: HistoryTransfer): Observable<HistoryTransfer> {
    return this.http.put<HistoryTransfer>(`${this.apiUrl}/historyTransfer/update`, HistoryTransfer);
  }


  addHistoryTransfer(HistoryTransfer: HistoryTransfer) : Observable<HistoryTransfer>{
    return this.http.post<HistoryTransfer>(`${this.apiUrl}/historyTransfer/add`, HistoryTransfer);
  }
}
