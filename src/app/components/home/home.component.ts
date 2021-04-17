import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chores } from 'src/app/interfaces/chores';
import { User } from 'src/app/interfaces/user';
import { ChoresService } from 'src/app/services/chores.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public page: number;
  public page1: number;

  chores: Chores[];
  choresById: Chores[];
  user: User;

  constructor(private choresService: ChoresService, private userService: UserService, private router: Router) {

    this.chores = []
  }

  async ngOnInit() {

    try {
      this.chores = await this.choresService.getAll();
    } catch (error) {
      console.log(error);
    }

    // Get info user by Id Token
    this.user = await this.userService.getById();
    this.choresById = this.user.chores;
    console.log('this is user', this.user);
  }

  logOut() {
    localStorage.removeItem('to-do-list');
    this.router.navigate(['/hero']);
  };
}
