import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/app/models/article';

import { catchError } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000/News';

@Injectable({
    providedIn: 'root'
})
export class NodeService {

    constructor(private http: HttpClient) {

    }

    getArticles() {
        const url = this.createUrl();

        return this.http.get<Article[]>(url);
    }

    getArticleByTitle(title: string) {
        const url = this.createUrl(`/title/${title}`);
        return this.http.get<Article>(url);
    }

    createArticles(article: Article) {
        const url = this.createUrl();
        return this.http.post<Article>(url, article).pipe(
            catchError(err => {
                return err;
            })
        ).subscribe((data) => {
        });
    }

    updateArticle(article: Article) {
        const url = this.createUrl(`/title/${article.title}`);
        return this.http.put(url, article).pipe(
            catchError(err => {
                return err;
            })
        ).subscribe((data) => {
            return data;
        });
    }

    deleteArticleByTitle(title: string) {
        const url = this.createUrl(`/title/${title}`);
        return this.http.delete(url).subscribe();
    }

    private createUrl(details: string = '') {
        return baseUrl + details;
    }
}
