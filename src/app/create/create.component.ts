import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  oldArticle: Article;

  constructor(private apiService: ApiService) {
    this.oldArticle = new Article();
    this.oldArticle.publishedAt = new Date();
  }

  ngOnInit() {
  }

  createNews($event) {
    this.apiService.createNodeArticles($event);
  }
}
