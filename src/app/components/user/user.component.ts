import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chores } from 'src/app/interfaces/chores';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

declare var Swal;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {



  user: User;
  formUser: FormGroup;
  chores: Chores[];

  constructor(private userService: UserService, private router: Router

  ) {

    this.formUser = new FormGroup({

      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl(),

    })
  }

  async ngOnInit() {

    // Get info user by Id Token
    this.user = await this.userService.getById();
    this.chores = this.user.chores;
    console.log('this is user', this.user);

    // FORM CONTENT

    this.formUser = new FormGroup({

      firstname: new FormControl(this.user.firstname),
      lastname: new FormControl(this.user.lastname),
      email: new FormControl(this.user.email),
      password: new FormControl(this.user.password),

    })
  }

  async onSubmitFormUser(): Promise<any> {

    try {

      const user = await this.userService.updateById(
        this.formUser.value
      );
      console.log(user);

    } catch (error) {
      console.log(error);
    }
  }

  deleteAccount() {
    Swal.fire({
      title: 'Are you sure you want to delete your Account?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {

        const deleteAccount = await this.userService.delete();
        console.log(deleteAccount);

        Swal.fire('Deleted!', 'Your account has been deleted.', 'success');

        localStorage.removeItem('to-do-list');
        this.router.navigate(['/hero']);
      }
    });
  }

  refresh(): void {
    window.location.reload();
  }


  logOut() {
    localStorage.removeItem('to-do-list');
    this.router.navigate(['/hero']);
  };
}
