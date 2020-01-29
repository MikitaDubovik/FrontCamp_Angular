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
  imageValue: any;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    let imageTypeName: string;
    if (!this.oldArticle.urlToImage || this.oldArticle.urlToImage.includes('http')) {
      imageTypeName = 'URL';
    } else {
      imageTypeName = 'File';
    }

    this.newsForm = this.fb.group({
      title: [this.oldArticle.title, Validators.required],
      description: [this.oldArticle.description, Validators.required],
      content: [this.oldArticle.content, Validators.required],
      image: [this.oldArticle.urlToImage, Validators.required],
      data: [this.oldArticle.publishedAt, Validators.required],
      author: [this.oldArticle.author, Validators.required],
      url: [this.oldArticle.url, Validators.required],
      imageType: imageTypeName
    });
  }

  onSubmit() {
    const article = new Article();
    article.urlToImage = this.imageValue;
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
    const file = fileInputEvent.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.newsForm.value.image = fileReader.result;
      this.imageValue = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }
}
