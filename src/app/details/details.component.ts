import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  article: Article;
  createdByMe: boolean;
  title: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
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
          this.title = 'AMASING NEWS';
          return this.apiService.getNodeArticleByTitle(title);
        }

        return this.apiService.getWebArticleByTitle(title);
      })
    ).subscribe(resp => { this.article = resp; this.title = resp.source.name; });
  }

  delete(title: string) {
    this.apiService.deleteNodeArticleByTitle(title);
  }
}
