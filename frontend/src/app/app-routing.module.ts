import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjekteComponent } from './modules/projekte/projekte.component';
import { ProjektUebersichtComponent } from './modules/projekte/projekt-uebersicht/projekt-uebersicht.component';
import { ProfilComponent } from './modules/profil/profil.component';
import { ProfilBearbeitenComponent } from './modules/profil/profil-bearbeiten/profil-bearbeiten.component';
import { FriendsComponent } from './modules/profil/friends/friends.component';
import { FriendrequestComponent } from './modules/profil/friendrequest/friendrequest.component';
import { ProfilbildComponent } from './modules/profil/profilbild/profilbild.component';
import { PasswortComponent } from './modules/profil/passwort/passwort.component';
import { MerkzettelComponent } from './modules/merkzettel/merkzettel.component';
import { FeedComponent } from './modules/feed/feed.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { RegisterPasswortComponent } from './modules/register/register-passwort/register-passwort.component';
import { RegisterProfilbildComponent } from './modules/register/register-profilbild/register-profilbild.component';
import { AuthGuardService as AuthGuard } from './core/authentication/auth-guard.service';
import { AnleitungComponent } from './modules/projekte/anleitung/anleitung.component';
import { DetailComponent } from './modules/detail/detail.component';
import { ProjektEndeComponent } from './modules/projekte/projekt-ende/projekt-ende.component';
import { ImpressumUndDatenschutzComponent } from './impressum-und-datenschutz/impressum-und-datenschutz.component';

const routes: Routes = [
  {
    path: '*',
    redirectTo: ''
  },

  { path: '', component: ProjekteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/password', component: RegisterPasswortComponent },
  { path: 'register/picture', component: RegisterProfilbildComponent },
  { path: 'projekte/detail/:projectId', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'projekte/detail/:projectId/step', component: AnleitungComponent, canActivate: [AuthGuard] },
  { path: 'projekte/detail/:projectId/ende', component: ProjektEndeComponent, canActivate: [AuthGuard] },
  { path: 'projekte/:categoryId', component: ProjektUebersichtComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'profil/edit', component: ProfilBearbeitenComponent, canActivate: [AuthGuard] },
  { path: 'profil/image', component: ProfilbildComponent, canActivate: [AuthGuard] },
  { path: 'profil/password', component: PasswortComponent, canActivate: [AuthGuard] },
  { path: 'profil/friends', component: FriendsComponent, canActivate: [AuthGuard] },
  { path: 'profil/friendrequest', component: FriendrequestComponent, canActivate: [AuthGuard] },
  { path: 'profil/:id', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'neues', component: FeedComponent, canActivate: [AuthGuard] },
  { path: 'merkzettel', component: MerkzettelComponent, canActivate: [AuthGuard] },
  { path: 'projekte', component: ProjekteComponent, canActivate: [AuthGuard] },
  { path: 'impressumUndDatenschutz', component: ImpressumUndDatenschutzComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
