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
import { UserGuard } from './guards/user.guard';

const routes: Routes = [

  { path: "", pathMatch: 'full', redirectTo: 'hero' },
  { path: 'home', component: HomeComponent, canActivate: [UserGuard] },
  { path: 'hero', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserComponent, canActivate: [UserGuard] },
  { path: 'myTasks', component: ChoresComponent, canActivate: [UserGuard] },
  { path: 'editTasks/:choreId', component: EditChoreComponent, canActivate: [UserGuard] },
  { path: 'createaccount', component: CreateUserComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
