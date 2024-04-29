import { Injectable } from '@angular/core';
import {Article} from "../Models/article";
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitDefectueux} from "../Models/produitDefectueux";
import {Puit} from "../Models/puit";

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }
  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/articles/read`);
  }



  getArticleById(id: number): Observable<Article> {
    const url = `${this.apiUrl}/articles/${id}`;
    return this.http.get<Article>(url);
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


