import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFormComponent } from './news-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatCardModule
} from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
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
    AppRoutingModule,
  ],
  exports: [
    NewsFormComponent]
})
export class NewsFormModule { }
