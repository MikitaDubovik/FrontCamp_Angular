import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Source } from '../models/source';
import { Article } from '../models/article';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  @Input() isAdded: boolean;
  createdByMe: boolean;
  sources: Source[];
  sourceId: string;
  articles: Article[];
  originalArticles: Article[];
  title: string;
  articlePage: number;
  filterInput: string;

  // Const
  myTitle: string;
  defaulTitle: string;

  constructor(private apiService: ApiService, private stateService: StateService) {
    this.myTitle = 'AMASING NEWS';
    this.defaulTitle = 'Please, choose source';
  }

  ngOnInit() {
    this.title = this.defaulTitle;

    this.apiService.getSources().subscribe(
      resp => {
        this.sources = resp;
      }
    );
  }

  receiveSourceId($event) {
    this.sourceId = $event;

    this.setInitialArticles();
  }


  receiveGlobalFilter($event) {
    this.filterInput = $event;

    this.globalFilter();
  }

  receiveCreatedByMeFilter($event) {
    this.createdByMe = $event;

    this.createdByMeFilter(this.createdByMe);
  }

  setInitialArticles() {
    this.apiService.getWebArticles(this.sourceId, 1).subscribe(
      resp => {
        if (resp.length > 0) {
          this.originalArticles = resp;
          this.articles = this.originalArticles;
          this.articlePage = 1;
          this.isAdded = true;
          this.filterInput = '';
          this.createdByMe = false;
        } else {
          alert('NEWS API IS BROKEN');
        }
      }
    );

    this.setSourceTitle();
  }

  loadMore() {
    this.articlePage++;

    // For future task with own DB
    // Add check for Load More button
    if (this.createdByMe) {
      this.createdByMeFilter(true);
      this.apiService.getNodeArticles().subscribe(resp => {
        this.articles.push(...resp);
      });
      // this.originalArticles = this.nodeService.getWebArticles(this.articlePage);
    } else {
      this.apiService.getWebArticles(this.sourceId, this.articlePage).subscribe(
        resp => {
          if (resp.length > 0) {
            this.originalArticles.push(...resp); // added for all cases

            if (this.filterInput) {
              if (resp.find(r => r.title.includes(this.filterInput))) {
                this.articles.push(...resp.filter(art => art.title.includes(this.filterInput)));
              } else {
                this.isAdded = false;
              }
            } else { // if no filterInput
              this.articles = this.originalArticles;
            }
          } else {
            this.isAdded = false;
          }
        }
      );
    }
  }

  globalFilter() {
    if (this.filterInput) {
      this.articles = this.articles.filter(art => art.title.includes(this.filterInput));
    } else {
      this.articles = this.originalArticles;
    }
  }

  createdByMeFilter(selectedOption) {
    if (selectedOption) {
      this.title = this.myTitle;
      this.apiService.getNodeArticles().subscribe(resp => {
        if (resp.length > 0) {
          this.articles = resp;
        } else {
          this.isAdded = false;
        }
      });
    } else {
      this.setSourceTitle();
      this.globalFilter();
    }
  }

  setSourceTitle() {
    if (this.sourceId) {
      this.title = this.sources.find(s => s.id === this.sourceId).name;
    } else {
      this.title = this.defaulTitle;
    }
  }
}
