import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './components/events/events.component';
import { CreateEventsComponent } from './components/create-events/create-events.component';
import { FbLikeComponent } from './components/social/fb.component';
import { LinkedInShareComponent } from './components/social/lkn.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { FormsModule } from '@angular/forms';
import { InformacionComponent } from './components/informacion/informacion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';


import {HttpClientModule} from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';


import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    CreateEventsComponent,
    InformacionComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    FbLikeComponent,
    LinkedInShareComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase,'angular-fs'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    JwSocialButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
