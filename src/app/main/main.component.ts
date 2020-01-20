import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service'
import { Source } from '../models/source';
import { Article } from '../models/article';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sources: Source[];
  articles: Article[];
  title: string;
  config: any;

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
    let id = selectedSource.value
    this.apiService.getArticles(id).subscribe(
      resp => {
        this.articles = resp;
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.articles.length
        };
      }
    );

    this.title = this.sources.find(s => s.id === id).name;
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
