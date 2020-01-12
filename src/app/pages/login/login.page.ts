import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fontSizeEnterLeave } from 'src/app/shared/animations';

import { UtilService } from 'src/app/services/util.service';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    fontSizeEnterLeave()
  ]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitionInitiated: boolean = false;

  invalidPassword = false;
  emailNotRegistered = false;

  constructor(
    private router: Router,

    private utilService: UtilService,
    private apiCallService: ApiCallService,
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9])+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnInit() {
  }

  login(){
    
    this.isSubmitionInitiated = true;
    if (this.loginForm.invalid) return;

    this.loginForm.disable();

    const credential = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.userService.login(credential)
      .then(res => {
        console.log(res);
        if (res.status === 'SUCCESS'){
          this.apiCallService.setHeaderToken(res.data.token);
          this.userService.setUser(res.data.user);
          this.router.navigateByUrl('/');
        } else {
          this.utilService.showToast();
          this.loginForm.enable();
        }
      })
      .catch(err => {
        if (err.status === 401){
          // 401 for email not available
          this.emailNotRegistered = true;
        } else if (err.status === 402){
          // 402 for incorrect password
          this.invalidPassword = true;
        } else {
          this.utilService.showToast();
        }
        this.loginForm.enable();
      });
  }

}
