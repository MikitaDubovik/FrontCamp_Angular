import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from '../../models/source';
import { Response } from '../../models/response';
import { Article } from 'src/app/models/article';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiKey = environment.newsapiApiKey;
const baseUrl = environment.newsapiUrl;

@Injectable({
    providedIn: 'root'
})
export class NewsapiService {

    constructor(private http: HttpClient) {

    }

    getSources() {
        const url = this.createUrl('v2/sources?country=gb');
        return this.http.get<Response<Source[]>>(url).pipe(map((obj => obj.sources)));
    }

    getArticles(id: string, page: number) {
        const url = this.createUrl(`v2/top-headlines?sources=${id}&page=${page}&pageSize=5`);
        return this.http.get<Response<Article[]>>(url).pipe(map(obj => obj.articles));
    }

    getArticleByTitle(title: string): Observable<Article> {
        const url = this.createUrl(`v2/top-headlines?q=${title}`);
        return this.http.get<Response<Article[]>>(url).pipe(map(obj => obj.articles[0]));
    }

    private createUrl(details: string) {
        return baseUrl + details + apiKey;
    }
}
