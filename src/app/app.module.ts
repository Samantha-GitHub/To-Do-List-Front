import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { ChoresComponent } from './components/chores/chores.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChoresComponent,
    HeroComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    Error404Component,
    ContactComponent,
    HomeComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
