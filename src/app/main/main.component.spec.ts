import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { NO_ERRORS_SCHEMA, ComponentFactoryResolver } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NewsCardDirective } from './news-card/news-card-directive';
import { NewsapiService } from '../services/api/newsapi-service';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article';
import { NodeService } from '../services/api/node-service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let newsapiService: NewsapiService;
  let componentFactoryResolver: ComponentFactoryResolver;
  let nodeService: NodeService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MainComponent, NewsCardDirective],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [NewsapiService, NodeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    component.articlePage = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change sourceId', () => {
    spyOn(component, 'setInitialArticles');
    component.receiveSourceId('TestSourceID');
    expect(component.sourceId).toEqual('TestSourceID');
    expect(component.setInitialArticles).toHaveBeenCalled();
  });

  it('should change filterInput', () => {
    spyOn(component, 'globalFilter');
    component.receiveGlobalFilter('TestFilterInput');
    expect(component.filterInput).toEqual('TestFilterInput');
    expect(component.globalFilter).toHaveBeenCalled();
  });

  it('should change createdByMe', () => {
    spyOn(component, 'createdByMeFilter');
    component.receiveCreatedByMeFilter(true);
    expect(component.createdByMe).toBeTruthy();
    expect(component.createdByMeFilter).toHaveBeenCalled();
  });

  it('should call newsapiService', () => {
    newsapiService = TestBed.get(NewsapiService);
    spyOn(newsapiService, 'getArticles').and.returnValue(new Observable<Article[]>());
    component.setInitialArticles();
    expect(newsapiService.getArticles).toHaveBeenCalled();
  });

  it('should call createdByMeFilter', () => {
    component.createdByMe = true;
    spyOn(component, 'createdByMeFilter');
    component.loadMore();
    expect(component.createdByMeFilter).toHaveBeenCalled();
  });

  it('should call getWebArticles', () => {
    component.createdByMe = false;
    spyOn(component, 'getWebArticles');
    component.loadMore();
    expect(component.getWebArticles).toHaveBeenCalled();
  });

  it('should update articlePage and call newsapiService', () => {
    newsapiService = TestBed.get(NewsapiService);
    spyOn(newsapiService, 'getArticles').and.returnValue(new Observable<Article[]>());
    const prevArticlePage = component.articlePage;

    component.getWebArticles();
    expect(newsapiService.getArticles).toHaveBeenCalled();
    expect(component.articlePage).toBeGreaterThan(prevArticlePage);
  });

  it('should set default title', () => {
    component.setSourceTitle();
    expect(component.title).toEqual('Please, choose source');
  });

  it('should set initial articles', () => {
    newsapiService = TestBed.get(NewsapiService);
    const articles: Article[] = [];
    articles[0] = new Article();
    spyOn(newsapiService, 'getArticles').and.returnValue(of(articles));

    spyOn(component, 'addArticles');
    spyOn(component, 'setSourceTitle');

    component.setInitialArticles();

    expect(component.articlePage).toEqual(1);
    expect(component.index).toEqual(-1);
    expect(component.componentsReferences.length).toEqual(0);
  });

  it('should filter news', () => {
    component.filterInput = 'test';
    const testValues = [{ test: 'test1' }, { test: 'test2' }];
    component.componentsReferences = testValues;

    spyOn(component.componentsReferences, 'filter').and.returnValue(testValues);
    spyOn(testValues, 'forEach');

    component.globalFilter();
    expect(component.componentsReferences.filter).toHaveBeenCalled();
  });

  it('should refresh news', () => {
    spyOn(component.viewContainerRef, 'clear');

    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);

    spyOn(componentFactoryResolver, 'resolveComponentFactory');

    spyOn(component.componentsReferences, 'forEach');

    component.globalFilter();

    expect(component.isAdded).toBeTruthy();
    expect(component.articlePage).toBeLessThan(0);
  });

  it('should display user\'s news', () => {
    component.myTitle = 'TestTitle';

    nodeService = TestBed.get(NodeService);
    const testValues: Article[] = [];
    const article = new Article();
    article.title = 'Test';
    testValues.push(article);

    spyOn(nodeService, 'getArticles').and.returnValue(of(testValues));

    component.createdByMeFilter(true);

    expect(component.title).toEqual('TestTitle');
    expect(nodeService.getArticles).toHaveBeenCalled();
    expect(component.isAdded).toBeFalsy();
  });

  it('should display remote news', () => {
    spyOn(component, 'setSourceTitle');
    spyOn(component, 'globalFilter');

    component.createdByMeFilter(false);

    expect(component.setSourceTitle).toHaveBeenCalled();
    expect(component.globalFilter).toHaveBeenCalled();
  });
});
