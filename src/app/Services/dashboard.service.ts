import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dashboard} from "../Models/Dashboard";
import {environment} from "../environment/environment";
import {getKeyToken} from "../../main";
import {DatePipe} from "@angular/common";
import {SumForAttributeRequest} from "../Models/sum-for-attribute-request";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl=environment.apiUrl



  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  getDashboardData(): Observable<Dashboard> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Dashboard>(`${this.apiUrl}/dashboard/data`, {headers});
  }else {
      return  new Observable<any>()}

  }

  getCountTotalAnalysesChimiques(): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques`, {headers});
  }else {
      return  new Observable<any[]>()}
  }


  getCountAnalyseChemiqueBassin(): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-bassin`, {headers});
  }else {
      return  new Observable<any[]>()}
  }

  countAnalysesChimiqueByBassinIdAndByMonth(bassinId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bassinId', bassinId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques-by-bassin`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }



  countPhysicalAnalysesByBassinIdAndByMonth(bassinId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bassinId', bassinId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-physiques-by-bassin`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }


//   ================SBNL========================================================
  countAnalysesChimiquesBySbnlIdAndByMonth(sbnlId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('sbnlId', sbnlId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques-by-sbnl`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }



  countPhysicalAnalysesBySbnlIdAndByMonth(sbnlId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('sbnlId', sbnlId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-physiques-by-sbnl`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }


  //   ================SBL========================================================
  countAnalysesChimiquesBySblIdAndByMonth(sblId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('sblId', sblId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques-by-sbl`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }



  countPhysicalAnalysesBySblIdAndByMonth(sblId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('sblId', sblId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-physiques-by-sbl`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }
//   ================PUIT========================================================
  countAnalysesChimiquesByPuitIdAndByMonth(puitId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('puitId', puitId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques-by-puit`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

//   ================SBLF========================================================
  countAnalysesChimiquesBySblfIdAndByMonth(sblfId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('sblfId', sblfId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques-by-sblf`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }



  countPhysicalAnalysesBySblfIdAndByMonth(sblfId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('sblfId', sblfId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-physiques-by-sblf`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }
//   ================Band========================================================
  countAnalysesChimiquesByBandIdAndByMonth(bandId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bandId', bandId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-chimiques-by-band`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }



  countPhysicalAnalysesByBandIdAndByMonth(bandId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bandId', bandId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-physiques-by-band`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }
// ========================================SUM RECOLTE VALUE BY BASSIN======================================
  sumRecolteValueByBassinIdAndByMonthAndYear(bassinId:number,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bassinId', bassinId).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-recolteValue-by-bassin`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

  sumRecolteValueByBassinIdAndByDayAndMonthInYear(bassinId:number,year:number,month:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bassinId', bassinId).set('year',year).set('month',month);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-day-total-recolteValue-by-bassin`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

//   ===========Production PER YEAR=============================================================
  sumSortie1ByMonthAndYear(year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-production-sortieb1`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }



  sumSortieB2ByMonthAndYear(year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-production-sortieb2`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }


  sumBigSaltByMonthAndYear(year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-production-resultCrible`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

  sumResultByMonthAndYear(year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-production-resultConcasseur`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }
//   =============PRODUCTION IN MONTH===========================================
  sumSortieB1ByDayAndMonthInYear(year:number,month:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year).set('month',month);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-day-total-production-sortieb1`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

  sumSortieB2ByDayAndMonthInYear(year:number,month:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year).set('month',month);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-day-total-production-sortieb2`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

  sumBigSaltByDayAndMonthInyear(year:number,month:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year).set('month',month);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-day-total-production-resultCrible`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }


  sumResultByDayAndMonthInYear(year:number,month:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('year',year).set('month',month);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-day-total-production-resultConcasseur`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

//   ==================QUANTITY TRANSFER DE SALT===========================
  findMonthlySumTransferQuantityByStartingPointArrivingPointAndYear(startingPoint:string,arrivingPoint:string,year:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('startingPoint',startingPoint).set('arrivingPoint',arrivingPoint).set('year',year);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-transfer`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }


  findDailySumTransferQuantityByStartingPointArrivingPointAndYearAndMonth(startingPoint:string,arrivingPoint:string,year:number,month:number): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('startingPoint',startingPoint).set('arrivingPoint',arrivingPoint).set('year',year).set('month',month);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-day-total-transfer`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }
//   ============SUM ETAT BASSIN==============================================
  sumDaysByEtatBassinAndMonthAndYear(bassinId:number,year:number,etatBassin:string): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      const params = new HttpParams().set('bassinId',bassinId).set('year',year).set('etatBassin',etatBassin);

      return this.http.get<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-etatBassin-by-bassin`, {headers, params });
    }else {
      return  new Observable<any[]>()}
  }

//   ===========================API Data For Attribute Bassin============================================
  calculateSumForAttributeBassin(sumForAttributeRequest:SumForAttributeRequest): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-SumForAttribute-by-bassin`, sumForAttributeRequest, {headers} );
    } else {
      return new Observable<any[]>(); // Return an empty observable if no token is present
    }
  }
//   ===========================API Data For Attribute Puit============================================
  calculateSumForAttributePuit(sumForAttributeRequest:SumForAttributeRequest): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-SumForAttribute-by-puit`, sumForAttributeRequest, {headers} );
    } else {
      return new Observable<any[]>(); // Return an empty observable if no token is present
    }
  }

  //   ===========================API Data For Attribute Sbnl============================================
  calculateSumForAttributeSbnl(sumForAttributeRequest:SumForAttributeRequest): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-SumForAttribute-by-sbnl`, sumForAttributeRequest, {headers} );
    } else {
      return new Observable<any[]>(); // Return an empty observable if no token is present
    }
  }

  //   ===========================API Data For Attribute Sbl============================================
  calculateSumForAttributeSbl(sumForAttributeRequest:SumForAttributeRequest): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-SumForAttribute-by-sbl`, sumForAttributeRequest, {headers} );
    } else {
      return new Observable<any[]>(); // Return an empty observable if no token is present
    }
  }

  //   ===========================API Data For Attribute Sblf============================================
  calculateSumForAttributeSblf(sumForAttributeRequest:SumForAttributeRequest): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-SumForAttribute-by-sblf`, sumForAttributeRequest, {headers} );
    } else {
      return new Observable<any[]>(); // Return an empty observable if no token is present
    }
  }
//   ===========================API Data For Attribute Band============================================
  calculateSumForAttributeBand(sumForAttributeRequest:SumForAttributeRequest): Observable<any[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<any[]>(`${this.apiUrl}/statistiques/count-by-month-total-SumForAttribute-by-band`, sumForAttributeRequest, {headers} );
    } else {
      return new Observable<any[]>(); // Return an empty observable if no token is present
    }
  }

}
