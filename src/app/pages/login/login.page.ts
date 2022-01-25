import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { UserService } from 'src/app/shared/services/user.service';
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
    private ref: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      console.log('Auth state changed to ', authState, authData);
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      this.onLogin();
    })
  }

  async onLogin() {
    try {
      if (this.authState === 'signedin') {
        await this.userService.setHeaderToken();
        this.getUser();
        // this.router.navigateByUrl('/choose-plan');
      }
    } catch {
      console.error('Error logging in');
    }
  }

  getUser() {
    this.userService.getUser().then(res => {
      console.log("Get user : ", res);
    }).catch(error => {
      console.error("Cannot get user : ", error);
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
