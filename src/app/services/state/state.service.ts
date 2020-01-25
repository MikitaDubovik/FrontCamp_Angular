import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/models/article';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private articleSource = new BehaviorSubject(null);
  currentArticle = this.articleSource.asObservable();

  private titleSource = new BehaviorSubject(null);
  currentTitle = this.titleSource.asObservable();

  constructor() { }

  changeArticle(article: Article) {
    this.articleSource.next(article);
  }

  changeTitle(title: string) {
    this.titleSource.next(title);
  }
}
