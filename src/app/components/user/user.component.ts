import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chores } from 'src/app/interfaces/chores';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  formUser: FormGroup;
  chores: Chores[];

  constructor(private userService: UserService

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

  refresh(): void {
    window.location.reload();
  }
}
