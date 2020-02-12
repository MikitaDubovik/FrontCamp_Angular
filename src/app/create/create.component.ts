import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { NodeService } from '../services/api/node-service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  oldArticle: Article;
  title = 'Create';

  constructor(private nodeService: NodeService) {
    this.oldArticle = new Article();
    this.oldArticle.publishedAt = new Date();
  }

  ngOnInit() {
  }

  createNews($event) {
    this.nodeService.createArticles($event).subscribe(resp => {
    });
  }
}
