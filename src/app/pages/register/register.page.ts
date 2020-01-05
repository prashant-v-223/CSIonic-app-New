import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { fieldEqual } from 'src/app/shared/custom-validators';
import { fontSizeEnterLeave } from 'src/app/shared/animations';

import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [
    fontSizeEnterLeave()
  ]
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isSubmitionInitiated: boolean = false;

  constructor(
    private userService: UserService
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9])+$')
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('([a-zA-Z0-9]+)'),
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])
    }, fieldEqual('password','confirmPassword'));
  }

  ngOnInit() {
  }

  selectGender(gender: 'male'|'female'){
    this.registerForm.get('gender').patchValue(gender);
  }

  register(){
    this.isSubmitionInitiated = true;
    if (this.registerForm.invalid) return;

    const newUser: User = {
      username: this.registerForm.get('username').value.trim(),
      email: this.registerForm.get('email').value.trim(),
      password: this.registerForm.get('password').value.trim(),
      gender: this.registerForm.get('gender').value.trim(),
      birthDate: this.registerForm.get('birthDate').value.trim()
    }

    console.log('Registering the new user..', newUser);

    this.userService.register(newUser);

  }

}
