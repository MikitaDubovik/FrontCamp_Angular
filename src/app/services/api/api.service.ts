import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Source } from 'src/app/models/source';

const apiKey = '&apiKey=980e9d4359984b1bb923d5e1043ce9e2';
const baseUrl = 'https://newsapi.org/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getSources(): Observable<Source[]> {
    let url = baseUrl + 'v2/sources?country=gb' + apiKey;
    return this.http.get<Source[]>(url);
  }

  getArticles(id: number) {
    let url = baseUrl + `v1/articles?source=${id}` + apiKey;
    return this.http.get(url);
  }
}
