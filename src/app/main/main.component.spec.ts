import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NewsCardDirective } from './news-card/news-card-directive';
import { NewsapiService } from '../services/api/newsapi-service';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let newsapiService: NewsapiService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [MainComponent, NewsCardDirective],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [NewsapiService]
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
});
