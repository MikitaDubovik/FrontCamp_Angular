import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Article } from '../models/article';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  oldArticle: Article;
  title = 'Edit';

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const title = params.get('title');
        return this.apiService.getNodeArticleByTitle(title);
      })
    ).subscribe(resp => this.oldArticle = resp);
  }

  updateNews($event) {
    this.apiService.updateNodeArticle($event);
  }

}
