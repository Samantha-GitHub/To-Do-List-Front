import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private userService: UserService, private choreService: ChoresService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.editChore = new FormGroup({

      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{1,25}$/)]),
      detail: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{1,50}$/)]),


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

    try {

      const chore = await this.choreService.updateByIdToken(
        id, this.editChore.value
      );

      this.router.navigate(['/myTasks']);

    } catch (error) {
      console.log(error);
    }
  }


  logOut() {
    localStorage.removeItem('to-do-list');
    this.router.navigate(['/hero']);
  };


}
