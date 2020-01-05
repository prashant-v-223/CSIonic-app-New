import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { fontSizeEnterLeave } from 'src/app/shared/animations';

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

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
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

    console.log('Loging in..');
  }

}
