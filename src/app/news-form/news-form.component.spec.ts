import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFormComponent } from './news-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatRadioModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewsFormComponent', () => {
  let component: NewsFormComponent;
  let fixture: ComponentFixture<NewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsFormComponent],
      imports: [
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send new article', () => {
    component.newsForm.patchValue({
      title: 'TestT',
      description: 'TestD',
      content: 'TestC',
      image: 'TestI',
      data: 'TestDa',
      author: 'TestA',
      url: 'TestU',
      imageType: 'TestIT'
    })

    spyOn(component.clickSaveButton, 'emit');

    component.onSubmit();

    expect(component.clickSaveButton.emit).toHaveBeenCalled();
  });

  it('should read file', () => {
    const blob = new Blob([""], { type: "text/html" });
    blob["lastModifiedDate"] = "";
    blob["name"] = "filename";
    const file = <File>blob;
    const event = {
      target: {
        files: [file]
      }
    };
    component.imageInputChange(event);
    expect(component.newsForm.value.image).not.toBeUndefined();
  })
});
