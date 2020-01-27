import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from '../../models/source';
import { Response } from '../../models/response';
import { Article } from 'src/app/models/article';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

const apiKey = '&apiKey=980e9d4359984b1bb923d5e1043ce9e2';
const baseWebUrl = 'https://newsapi.org/';
const baseNodeUrl = 'http://localhost:3000/News';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getSources() {
    const url = this.createWebUrl('v2/sources?country=gb');
    return this.http.get<Response<Source[]>>(url).pipe(map((obj => obj.sources)));
  }

  getWebArticles(id: string, page: number) {
    const url = this.createWebUrl(`v2/top-headlines?sources=${id}&page=${page}&pageSize=5`);
    return this.http.get<Response<Article[]>>(url).pipe(map(obj => obj.articles));
  }

  getWebArticleByTitle(title: string): Observable<Article> {
    const url = this.createWebUrl(`v2/top-headlines?q=${title}`);
    return this.http.get<Response<Article[]>>(url).pipe(map(obj => obj.articles[0]));
  }

  getNodeArticles() {
    const url = this.createNodeUrl();

    return this.http.get<Article[]>(url);
  }

  getNodeArticleByTitle(title: string) {
    const url = this.createNodeUrl(`/title/${title}`);
    return this.http.get<Article>(url);
  }

  createNodeArticles(article: Article) {
    const url = this.createNodeUrl();
    return this.http.post<Article>(url, article).pipe(
      catchError(err => {
        return err;
      })
    ).subscribe((data) => {
    });
  }

  updateNodeArticle(article: Article) {
    const url = this.createNodeUrl(`/title/${article.title}`);
    return this.http.put(url, article).pipe(
      catchError(err => {
        return err;
      })
    ).subscribe((data) => {
      return data;
    });
  }

  deleteNodeArticleByTitle(title: string) {
    const url = this.createNodeUrl(`/title/${title}`);
    return this.http.delete(url).subscribe();
  }

  private createWebUrl(details: string) {
    return baseWebUrl + details + apiKey;
  }

  private createNodeUrl(details: string = '') {
    return baseNodeUrl + details;
  }
}
