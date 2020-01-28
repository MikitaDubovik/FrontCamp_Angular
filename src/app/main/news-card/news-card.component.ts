import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article';

export interface DeleteArticle {
  deleteArticle(title: string, index: number);
}

@Component({
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {

  public index: number;

  @Input() article: Article;
  @Input() createdByMe: boolean;

  //interface for Parent-Child interaction
  public compInteraction: DeleteArticle;

  constructor() { }

  ngOnInit() {
  }

  deleteArticle() {
    this.compInteraction.deleteArticle(this.article.title, this.index);
  }
}
