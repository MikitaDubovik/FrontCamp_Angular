import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {
  MatButtonModule,
  MAT_RADIO_DEFAULT_OPTIONS,
  MatCardModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { BasicAuthInterceptor } from './helpers/basic-auth-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { NotFoundModule } from './not-found/not-found.module';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { NewsFormModule } from './news-form/news-form.module';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DetailsComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    NotFoundModule,
    MainModule,
    SharedModule,
    FooterModule,
    HeaderModule,
    NewsFormModule,
    SignInModule,
    SignUpModule
  ],
  exports: [
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },

  },
  { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule { }
