import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state/state.service';
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

  constructor(private state: StateService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const title = params.get('title');
        return this.apiService.getWebArticleByTitle(title);
      })
    ).subscribe(resp => this.article = resp[0]);
  }
}
