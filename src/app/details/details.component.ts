import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state/state.service';
import { Article } from '../models/article';

@Component({
  selector: 'app-main',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  article: Article;
  title: string;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.currentArticle.subscribe(article => this.article = article);
    this.state.currentTitle.subscribe(title => this.title = title);
  }
}
