import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chores } from 'src/app/interfaces/chores';
import { User } from 'src/app/interfaces/user';
import { ChoresService } from 'src/app/services/chores.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-chore',
  templateUrl: './edit-chore.component.html',
  styleUrls: ['./edit-chore.component.css']
})
export class EditChoreComponent implements OnInit {

  user: User;
  editChore: FormGroup;
  chores: Chores[];
  chore: Chores;

  constructor(private userService: UserService, private choreService: ChoresService, private activatedRoute: ActivatedRoute) {

    this.editChore = new FormGroup({

      title: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),


    })
  }

  ngOnInit(): void {

    this.editChore = new FormGroup({

      title: new FormControl(this.chore.title),
      detail: new FormControl(this.chore.detail),
    })
  }

  async onSubmitEditChore(): Promise<any> {

    const id = this.activatedRoute.snapshot.paramMap.get('choreId');
    console.log('log del params id', id);

    try {

      const chore = await this.choreService.updateByIdToken(
        id, this.editChore.value
      );
      console.log(chore);

    } catch (error) {
      console.log(error);
    }
  }




}