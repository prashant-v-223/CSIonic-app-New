import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  formFields = [{
    type: 'email',
    label: 'Email',
    placeholder: 'Enter email here',
    inputProps: { required: true, autocomplete: 'email' },
  }, {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password here',
    inputProps: { required: true, autocomplete: 'new-password' },
  }, {
    type: 'given_name',
    label: 'First Name',
    placeholder: 'Enter your first name',
    inputProps: { required: true },
  }, {
    type: 'family_name',
    label: 'Last Name',
    placeholder: 'Enter your last name',
    inputProps: { required: true },
  }, {
    type: 'phone_number',
    label: 'Phone Number',
    placeholder: 'Enter Phone number here',
    inputProps: { required: true, autocomplete: 'tel' },
  }];

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      this.onLogin();
    })
  }

  onLogin() {
    if(this.authState === 'signedin'){
      this.router.navigateByUrl('/choose-plan');
    }
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
