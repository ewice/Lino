import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';

import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { RegisterPasswortComponent } from './modules/register/register-passwort/register-passwort.component';
import { RegisterProfilbildComponent } from './modules/register/register-profilbild/register-profilbild.component';
import { FriendsComponent } from './modules/profil/friends/friends.component';
import { FriendrequestComponent } from './modules/profil/friendrequest/friendrequest.component';
import { ProfilBearbeitenComponent } from './modules/profil/profil-bearbeiten/profil-bearbeiten.component';
import { ProfilbildComponent } from './modules/profil/profilbild/profilbild.component';
import { PasswortComponent } from './modules/profil/passwort/passwort.component';
import { ProfilComponent } from './modules/profil/profil.component';
import { ProjekteComponent } from './modules/projekte/projekte.component';
import { ProjektUebersichtComponent } from './modules/projekte/projekt-uebersicht/projekt-uebersicht.component';
import { AnleitungComponent } from './modules/projekte/anleitung/anleitung.component';
import { ProjektEndeComponent } from './modules/projekte/projekt-ende/projekt-ende.component';
import { DetailComponent } from './modules/detail/detail.component';
import { FeedComponent } from './modules/feed/feed.component';
import { MerkzettelComponent } from './modules/merkzettel/merkzettel.component';

import { ProjectCardComponent } from './shared/components/project-card/project-card.component';
import { FriendsCardComponent } from './shared/components/friends-card/friends-card.component';
import { FriendaddCardComponent } from './shared/components/friendadd-card/friendadd-card.component';
import { EssentialCardComponent } from './shared/components/essential-card/essential-card.component';
import { ProjectEndCardComponent } from './shared/components/project-end-card/project-end-card.component';
import { ProjectBeginCardComponent } from './shared/components/project-begin-card/project-begin-card.component';
import { NotificationCardComponent } from './shared/components/notification-card/notification-card.component';
import { FriendrequestCardComponent } from './shared/components/friendrequest-card/friendrequest-card.component';
import { ProjectrequestCardComponent } from './shared/components/projectrequest-card/projectrequest-card.component';
import { CategoryCardComponent } from './shared/components/category-card/category-card.component';
import { DifficultyBadgeComponent } from './shared/components/difficulty-badge/difficulty-badge.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { HttpService } from './core/http/http.service';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

import { AuthService } from './core/authentication/auth.service';
import { MinutePipePipe } from './minute-pipe.pipe';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { ImpressumUndDatenschutzComponent } from './impressum-und-datenschutz/impressum-und-datenschutz.component';

@NgModule({
  declarations: [
    AppComponent,
    MerkzettelComponent,
    ProfilComponent,
    FeedComponent,
    ProjekteComponent,
    ProjectCardComponent,
    ProjektUebersichtComponent,
    DetailComponent,
    EssentialCardComponent,
    ProjectEndCardComponent,
    ProjectBeginCardComponent,
    NotificationCardComponent,
    FriendrequestCardComponent,
    ProjectrequestCardComponent,
    CategoryCardComponent,
    RegisterComponent,
    DifficultyBadgeComponent,
    LoginComponent,
    HeaderComponent,
    AnleitungComponent,
    ProfilBearbeitenComponent,
    ProfilbildComponent,
    PasswortComponent,
    RegisterPasswortComponent,
    RegisterProfilbildComponent,
    ProjektEndeComponent,
    FriendsComponent,
    FriendsCardComponent,
    FriendaddCardComponent,
    FriendrequestComponent,
    MinutePipePipe,
    ImpressumUndDatenschutzComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    WebcamModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HttpService, DatePipe, { provide: LOCALE_ID, useValue: "de-DE" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
