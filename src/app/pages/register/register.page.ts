import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fontSizeEnterLeave } from 'src/app/shared/animations';
import { fieldEqual } from 'src/app/shared/custom-validators';

import { UtilService } from 'src/app/services/util.service';
import { ApiCallService } from 'src/app/services/api/api-call.service';
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
  emailAlreadyRegistered = false;

  constructor(
    private router: Router,

    private utilService: UtilService,
    private apiCallService: ApiCallService,
    private userService: UserService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('([a-zA-Z0-9 ]+)')
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9])+$')
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

    this.registerForm.disable();

    const newUser: User = {
      name: this.registerForm.get('name').value.trim(),
      email: this.registerForm.get('email').value.trim(),
      password: this.registerForm.get('password').value.trim(),
      gender: this.registerForm.get('gender').value.trim(),
      dob: this.registerForm.get('birthDate').value.trim()
    }

    console.log(newUser);

    this.userService.register(newUser)
      .then(res => {
        console.log(res);
        if (res.status === 'SUCCESS'){
          this.apiCallService.setHeaderToken(res.data.token);
          this.userService.setUser(res.data.user);
          this.router.navigateByUrl('/');
        } else {
          this.utilService.showToast();
          this.registerForm.enable();
        }
      })
      .catch(err => {
        //401 Email already exists
        if (err.status === 401){
          this.emailAlreadyRegistered = true;
        } else {
          console.log('ERROR in user registeration', err);
          this.utilService.showToast();
        }
        this.registerForm.enable();
      })
  }

}
