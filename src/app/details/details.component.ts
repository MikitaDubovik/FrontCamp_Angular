import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { NodeService } from '../services/api/node-service';
import { NewsapiService } from '../services/api/newsapi-service';

@Component({
  selector: 'app-main',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  article: Article;
  createdByMe: boolean;
  title: string;
  defaultTitle = 'AMAZING NEWS';

  constructor(private route: ActivatedRoute, private nodeService: NodeService, private newsapiService: NewsapiService) {
    this.title = '';
    this.article = new Article();
    this.article.title = '';
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.createdByMe = params.get('createdByMe') === 'true';
        const title = params.get('title');
        if (this.createdByMe) {
          this.title = this.defaultTitle;
          return this.nodeService.getArticleByTitle(title);
        }

        return this.newsapiService.getArticleByTitle(title);
      })
    ).subscribe(resp => { this.article = resp; this.title = resp.source ? resp.source.name : this.defaultTitle; });
  }

  delete(title: string) {
    this.nodeService.deleteArticleByTitle(title);
  }
}
