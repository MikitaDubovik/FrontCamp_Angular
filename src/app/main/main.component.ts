import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Source } from '../models/source';
import { Article } from '../models/article';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsCardWrapper } from './news-card/news-card-wrapper';

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
  index: number;
  viewContainerRef: ViewContainerRef;

  // Const
  myTitle: string;
  defaulTitle: string;

  @ViewChild(NewsCardWrapper, { static: true }) newsCardviewContainerRef: NewsCardWrapper;
  componentsReferences = [];

  constructor(private apiService: ApiService, private componentFactoryResolver: ComponentFactoryResolver) {
    this.myTitle = 'AMASING NEWS';
    this.defaulTitle = 'Please, choose source';
  }

  ngOnInit() {
    this.title = this.defaulTitle;
    this.viewContainerRef = this.newsCardviewContainerRef.viewContainerRef;
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

          this.addArticles();
        } else {
          alert('NEWS API IS BROKEN');
        }
      }
    );


    this.setSourceTitle();
  }

  deleteArticle(title, index) {

    this.apiService.deleteNodeArticleByTitle(title);

    // removing component from container
    this.viewContainerRef.remove(index);

    this.componentsReferences = this.componentsReferences.filter(x => x.index !== index);
  }

  addArticles() {
    const newsCardFactory = this.componentFactoryResolver.resolveComponentFactory(NewsCardComponent);
    this.viewContainerRef.clear();
    for (let i = 0; i < this.articles.length; i++) {
      const componentRef = this.viewContainerRef.createComponent(newsCardFactory);
      const currentComponent = componentRef.instance;

      currentComponent.article = this.articles[i];
      currentComponent.index = this.index++;
      currentComponent.createdByMe = this.createdByMe;
      currentComponent.compInteraction = this;
      // add reference for newly created component
      this.componentsReferences.push(currentComponent);
    }
  }

  loadMore() {
    this.articlePage++;

    if (this.createdByMe) {
      this.createdByMeFilter(true);
      this.apiService.getNodeArticles().subscribe(resp => {
        this.articles.push(...resp);
        this.addArticles();
      });
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

          this.addArticles();
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
          this.addArticles();
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
