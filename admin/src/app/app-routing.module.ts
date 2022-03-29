import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './modules/category/category.component';
import { CategoryOverviewComponent } from './modules/category/category-overview/category-overview.component';
import { CategoryCreateComponent } from './modules/category/category-create/category-create.component';
import { ProjectComponent } from './modules/project/project.component';
import { ProjectOverviewComponent } from './modules/project/project-overview/project-overview.component';
import { ProjectCreateComponent } from './modules/project/project-create/project-create.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ProfileOverviewComponent } from './modules/profile/profile-overview/profile-overview.component';
import { ProfileCreateComponent } from './modules/profile/profile-create/profile-create.component';
import { HomeComponent } from './modules/home/home.component';


const routes: Routes = [
  { path: '*',
    redirectTo: ''
  },

  { path: '', component: HomeComponent},
  { path: 'category', component: CategoryComponent },
  { path: 'category/show', component: CategoryOverviewComponent },
  { path: 'category/create', component: CategoryCreateComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'project/show', component: ProjectOverviewComponent },
  { path: 'project/create', component: ProjectCreateComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/show', component: ProfileOverviewComponent },
  { path: 'profile/create', component: ProfileCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
