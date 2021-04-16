import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formUser: FormGroup;

  constructor(
    private router: Router, private userService: UserService
  ) {

    this.formUser = new FormGroup({

      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/),
      ]),

    })
  }

  ngOnInit(): void {
  }

  async onSubmitFormUser(): Promise<any> {

    try {

      const user = await this.userService.create(
        this.formUser.value
      );
      console.log(user);

      // ROUTING TO FORM
      this.router.navigate(['/login']);


    } catch (error) {
      console.log(error);
    }
  }

}
