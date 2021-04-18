import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chores } from 'src/app/interfaces/chores';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ChoresService } from 'src/app/services/chores.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var Swal;


@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
  styleUrls: ['./chores.component.css']
})
export class ChoresComponent implements OnInit {

  public page: number;

  formChores: FormGroup;
  user: User;
  chores: Chores[];
  chore: Chores;

  constructor(private userService: UserService, private choreService: ChoresService, private activatedRoute: ActivatedRoute, private router: Router
  ) {
    this.formChores = new FormGroup({

      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{1,25}$/)]),
      detail: new FormControl('', [
        Validators.required,
        Validators.pattern(/^.{1,50}$/)]),

    })
  }

  async ngOnInit() {

    // Get info user by Id Token
    this.user = await this.userService.getById();
    this.chores = this.user.chores;
  }

  async onSubmitChores(): Promise<any> {

    const chore = await this.choreService.create(
      this.formChores.value
    );
    console.log(chore);


  }

  deleteTask(choreId) {
    Swal.fire({
      title: 'Are you sure you want to delete that task?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteTask = await this.choreService.deleteByIdToken(
          choreId
        );
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

        window.location.reload();
      }
    });



  }

  updateTask(choreId) {

    this.router.navigate([`editTasks/${choreId}`]);

  }
  refresh(): void {
    window.location.reload();
  }


  logOut() {
    localStorage.removeItem('to-do-list');
    this.router.navigate(['/hero']);
  };
}
