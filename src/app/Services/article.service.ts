import { Injectable } from '@angular/core';
import {Article} from "../Models/article";
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles/read`);
  }

  addArticle(article: Article) : Observable<Article>{
    return this.http.post<Article>(`${this.apiUrl}/articles/add`, article);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/articles/update/${article.id}`, article);
  }

  deleteArticle(articleId: number | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/delete/${articleId}`);
  }
}


