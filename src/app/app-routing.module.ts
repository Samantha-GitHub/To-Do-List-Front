import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoresComponent } from './components/chores/chores.component';
import { EditChoreComponent } from './components/chores/edit-chore/edit-chore.component';
import { Error404Component } from './components/error404/error404.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [

  { path: "", pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'hero', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserComponent },
  { path: 'myTasks', component: ChoresComponent },
  { path: 'editTasks/:choreId', component: EditChoreComponent },
  { path: 'createaccount', component: CreateUserComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
