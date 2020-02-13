import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCardComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
