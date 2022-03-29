import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './modules/category/category.component';
import { ProjectComponent } from './modules/project/project.component';
import { HomeComponent } from './modules/home/home.component';
import { CategoryOverviewComponent } from './modules/category/category-overview/category-overview.component';
import { CategoryCreateComponent } from './modules/category/category-create/category-create.component';
import { ProjectOverviewComponent } from './modules/project/project-overview/project-overview.component';
import { ProjectCreateComponent } from './modules/project/project-create/project-create.component';
import { CategoryCardComponent } from './shared/components/category-card/category-card.component';
import { ProjectCardComponent } from './shared/components/project-card/project-card.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './core/http/http.service';
import { ProfileComponent } from './modules/profile/profile.component';
import { ProfileCreateComponent } from './modules/profile/profile-create/profile-create.component';
import { ProfileOverviewComponent } from './modules/profile/profile-overview/profile-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProjectComponent,
    HomeComponent,
    CategoryOverviewComponent,
    CategoryCreateComponent,
    ProjectOverviewComponent,
    ProjectCreateComponent,
    CategoryCardComponent,
    ProjectCardComponent,
    ProfileComponent,
    ProfileCreateComponent,
    ProfileOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})

export class AppModule { }
