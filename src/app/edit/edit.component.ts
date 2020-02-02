import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Article } from '../models/article';
import { NodeService } from '../services/api/node-service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  oldArticle: Article;
  title = 'Edit';

  constructor(private nodeService: NodeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const title = params.get('title');
        return this.nodeService.getArticleByTitle(title);
      })
    ).subscribe(resp => this.oldArticle = resp);
  }

  updateNews($event) {
    this.nodeService.updateArticle($event);
  }

}
