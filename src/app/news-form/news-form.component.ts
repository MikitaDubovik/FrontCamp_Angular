import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  newsForm = this.fb.group({
    heading: ['', Validators.required],
    description: ['', Validators.required],
    content: ['', Validators.required],
    image: ['', Validators.required],
    data: ['', Validators.required],
    author: ['', Validators.required],
    url: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
  }

}
