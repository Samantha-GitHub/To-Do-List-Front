import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  labels: string[];
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private userService: UserService) {

    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<any> {
    this.errorMessage = null;

    try {
      const response = await this.userService.login(this.loginForm.value);
      if (response['error']) {
        setTimeout(() => (this.errorMessage = response.error), 500);
        /*  this.errorMessage = response.error; */
      } else {
        localStorage.setItem('to-do-list', response.token);
        console.log(response.token);

        this.router.navigate(['/home']);


        this.errorMessage = null;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
