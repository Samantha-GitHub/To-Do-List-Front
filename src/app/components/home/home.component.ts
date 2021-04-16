import { Component, OnInit } from '@angular/core';
import { Chores } from 'src/app/interfaces/chores';
import { ChoresService } from 'src/app/services/chores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chores: Chores[];

  constructor(private choresService: ChoresService) {

    this.chores = []
  }

  async ngOnInit() {

    try {
      this.chores = await this.choresService.getAll();
    } catch (error) {
      console.log(error);
    }


  }

}
