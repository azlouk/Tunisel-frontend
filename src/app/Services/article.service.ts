import { Injectable } from '@angular/core';
import {Article} from "../Models/article";
import {environment} from "../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {getKeyToken} from "../../main";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }
  getAllArticles(): Observable<Article[]> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.get<Article[]>(`${this.apiUrl}/articles/read`, {headers});
  }else {
      return  new Observable<any>()}}



  getArticleById(id: number): Observable<Article> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    const url = `${this.apiUrl}/articles/${id}`;
    return this.http.get<Article>(url, {headers});
  }else {
      return  new Observable<any>()}}

  addArticle(article: Article) : Observable<Article>{
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.post<Article>(`${this.apiUrl}/articles/add`, article, {headers});
  }else {
      return  new Observable<any>()}}

  updateArticle(article: Article): Observable<Article> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.put<Article>(`${this.apiUrl}/articles/update/${article.id}`, article, {headers});
  }else {
      return  new Observable<any>()}}

  deleteArticle(articleId: number | undefined): Observable<any> {
    const token = getKeyToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
    return this.http.delete(`${this.apiUrl}/articles/delete/${articleId}`, {headers});
  }else {
      return  new Observable<any>()}}
}


