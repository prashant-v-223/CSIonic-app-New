import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { UserService } from 'src/app/shared/services/user.service';

import { SplashScreen } from '@capacitor/splash-screen';
import { COPY } from 'src/app/shared/helper/const';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  CONSTANT: any = COPY;

  isLoading = false;

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
    onAuthUIStateChange(async (authState, authData) => {
      console.log('Auth state changed to ', authState, authData);
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
      await SplashScreen.hide();
      this.onLogin();
    })
  }

  async onLogin() {
    try {
      if (this.authState === 'signedin') {
        this.isLoading = true;
        await this.userService.setHeaderToken();
        const user = await this.getUser();
        if (user)
          this.router.navigateByUrl('/tabs/dashboard');
      }
    } catch {
      console.error('Error logging in');
    } finally {
      this.isLoading = false;
    }
  }

  async getUser() {
    try {
      const userRes = await this.userService.getUser();
      console.log("Get user : ", userRes);
      
      if (userRes.status === this.CONSTANT.SUCCESS){
        this.userService.setUserToStorage(userRes.data);
        return userRes.data;
      }
    } catch (e) {
      console.log('Error in fetching user data', e);
      return null;
    }
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
