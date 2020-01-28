import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatCheckboxModule, MatSelectModule, MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
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
import { NewsCardWrapper } from './main/news-card/news-card-wrapper';

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
    NewsCardWrapper
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
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent, NewsCardComponent
  ]
})
export class AppModule { }
