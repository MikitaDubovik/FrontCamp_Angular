import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api/api.service'
import { Source } from '../models/source';
import { Article } from '../models/article';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() isAdded: boolean;
  sources: Source[];
  sourceId: string;
  articles: Article[];
  title: string;
  articlePage: number;
  filterInput: string;


  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.title = 'Please, choose source';
    this.apiService.getSources().subscribe(
      resp => {
        this.sources = resp;
      }
    );
  }

  onChangeObj(selectedSource) {
    this.sourceId = selectedSource.value
    this.apiService.getArticles(this.sourceId, 1).subscribe(
      resp => {
        if (resp.length > 0) {
          this.articles = resp;
          this.articlePage = 1;
          this.isAdded = true;
          this.filterInput = "";
        } else {
          alert('NEWS API IS BROKEN');
        }
      }
    );

    this.title = this.sources.find(s => s.id === this.sourceId).name;
  }

  loadMore() {
    this.articlePage++;
    this.apiService.getArticles(this.sourceId, this.articlePage).subscribe(
      resp => {
        if (resp.length > 0) {
          if (this.filterInput) {
            if (resp.find(art => art.title.includes(this.filterInput))) {
              this.articles.push(...resp.filter(art => art.title.includes(this.filterInput)));
            } else {
              this.isAdded = false;
            }
          } else {
            this.articles.push(...resp);
          }
        } else {
          this.isAdded = false;
        }
      }
    );
  }

  filter() {
    this.articles = this.articles.filter(art => art.title.includes(this.filterInput));
  }
}
