import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Article } from '../models/article';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  @Input() oldArticle: Article;
  @Output() clickSaveButton = new EventEmitter<Article>();

  newsForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.newsForm = this.fb.group({
      title: [this.oldArticle.title, Validators.required],
      description: [this.oldArticle.description, Validators.required],
      content: [this.oldArticle.content, Validators.required],
      image: [this.oldArticle.urlToImage, Validators.required],
      data: [this.oldArticle.publishedAt, Validators.required],
      author: [this.oldArticle.author, Validators.required],
      url: [this.oldArticle.url, Validators.required],
      imageType: 'URL'
    });
  }

  onSubmit() {
    const article = new Article();
    article.urlToImage = this.newsForm.value.image;
    article.title = this.newsForm.value.title;
    article.description = this.newsForm.value.description;
    article.publishedAt = this.newsForm.value.data;
    article.createdByMe = true;
    article.author = this.newsForm.value.author;
    article.url = this.newsForm.value.url;
    article.content = this.newsForm.value.content;
    this.clickSaveButton.emit(article);
  }

  imageInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
