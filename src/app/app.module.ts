import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {
  MatCheckboxModule,
  MatSelectModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { FilterComponent } from './main/filter/filter.component';
import { NewsCardComponent } from './main/news-card/news-card.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsCardDirective } from './main/news-card/news-card-directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
    NotFoundComponent,
    DetailsComponent,
    FilterComponent,
    NewsCardComponent,
    EditComponent,
    CreateComponent,
    NewsFormComponent,
    NewsCardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent, NewsCardComponent
  ]
})
export class AppModule { }
