import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Source } from '../models/source';
import { Article } from '../models/article';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewsCardDirective } from './news-card/news-card-directive';
import { NewsapiService } from '../services/api/newsapi-service';
import { NodeService } from '../services/api/node-service';


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
  title: string;
  articlePage: number;
  filterInput: string;
  index: number;
  viewContainerRef: ViewContainerRef;
  initialLoad: boolean;

  // Const
  myTitle: string;
  defaulTitle: string;

  @ViewChild(NewsCardDirective, { static: true }) newsCardviewContainerRef: NewsCardDirective;
  componentsReferences = [];

  constructor(
    private newsapiService: NewsapiService,
    private nodeService: NodeService,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this.myTitle = 'AMASING NEWS!';
    this.defaulTitle = 'Please, choose source';
    this.index = -1;
    this.initialLoad = true;
  }

  ngOnInit() {
    this.title = this.defaulTitle;
    this.viewContainerRef = this.newsCardviewContainerRef.viewContainerRef;
    this.newsapiService.getSources().subscribe(
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
    this.newsapiService.getArticles(this.sourceId, 1).subscribe(
      resp => {
        if (resp.length > 0) {
          this.articlePage = 1;
          this.isAdded = true;
          this.filterInput = '';
          this.createdByMe = false;
          this.initialLoad = false;
          this.index = -1;
          this.componentsReferences = [];
          this.viewContainerRef.clear();

          this.addArticles(resp);
          this.setSourceTitle();
        } else {
          alert('NEWS API IS BROKEN');
        }
      }
    );
  }

  deleteArticle(title, index) {

    this.nodeService.deleteArticleByTitle(title);

    // removing component from container
    this.viewContainerRef.remove(index);

    this.componentsReferences = this.componentsReferences.filter(x => x.index !== index);
  }

  loadMore() {
    if (this.createdByMe) {
      this.createdByMeFilter(true);
    } else {
      this.getWebArticles();
    }
  }

  globalFilter() {
    if (this.filterInput) {
      this.componentsReferences.filter(
        data => !data.article.title.toLowerCase().includes(
          this.filterInput.toLowerCase())).forEach(element => {
            this.viewContainerRef.remove(element.index);
          });
    } else {
      this.viewContainerRef.clear();
      const newsCardFactory = this.componentFactoryResolver.resolveComponentFactory(NewsCardComponent);

      this.componentsReferences.forEach(element => {
        const componentRef = this.viewContainerRef.createComponent(newsCardFactory);
        componentRef.instance.article = element.article;
        componentRef.instance.index = element.index;
        componentRef.instance.createdByMe = element.createdByMe;
        componentRef.instance.compInteraction = element.compInteraction;
      });

      this.isAdded = true;
      this.articlePage--;
    }
  }

  getWebArticles() {
    this.articlePage++;

    this.newsapiService.getArticles(this.sourceId, this.articlePage).subscribe(
      resp => {
        if (resp.length > 0) {

          if (this.filterInput) {
            if (resp.find(r => r.title.toLowerCase().includes(this.filterInput.toLowerCase()))) {
              this.addArticles(resp.filter(art => art.title.toLowerCase().includes(this.filterInput.toLowerCase())));
            } else {
              this.isAdded = false;
            }
          } else {  // if no filterInput
            this.addArticles(resp);
          }
        } else {
          this.isAdded = false;
        }
      }
    );
  }

  createdByMeFilter(selectedOption) {
    if (selectedOption) {
      this.title = this.myTitle;
      this.initialLoad = false;
      this.viewContainerRef.clear();
      this.nodeService.getArticles().subscribe(resp => {
        if (resp.length > 0) {
          this.addArticles(resp);
        }

        this.isAdded = false;
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

  addArticles(articles: Article[]) {
    const newsCardFactory = this.componentFactoryResolver.resolveComponentFactory(NewsCardComponent);

    for (const article of articles) {
      this.index++;
      const componentRef = this.viewContainerRef.createComponent(newsCardFactory);
      const currentComponent = componentRef.instance;

      currentComponent.article = article;
      currentComponent.index = this.index;
      currentComponent.createdByMe = this.createdByMe;
      currentComponent.compInteraction = this;
      // add reference for newly created component
      this.componentsReferences.push(currentComponent);
    }
  }
}
