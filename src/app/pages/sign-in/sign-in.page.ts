import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NavController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

import { Auth } from 'aws-amplify';

import { COPY } from 'src/app/shared/helper/const';
import { UserService } from 'src/app/shared/services/user.service';
import { passwordRequirementMessage, passwordValidator } from 'src/app/shared/validators/password-validator';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  CONSTANT: any = COPY;
  isLoading = false;
  earlyAccessDetails: [] = [];
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  token : any = '';
  errorResp: string = '';
  errorShow: boolean = false;
  readonly passwordRequirementMessage = passwordRequirementMessage;

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9_@.]+'), Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator]),
  });

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private toastController: ToastController,
    private userService: UserService,
    private configurationService: ConfigurationService,
    private notificationService: NotificationService,
    private platform: Platform
  ) { }

  async ngOnInit() {
    await SplashScreen.hide();
    localStorage.setItem('portfolio-data', null);
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async signIn() {
    if (this.signInForm.invalid) return;

    this.isLoading = true;
    this.signInForm.disable();
    this.errorShow = false;

    try {
      await Auth.signIn(this.signInForm.value);
      await this.userService.setHeaderToken();
      const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
      if (isPushNotificationsAvailable) {
        this.token = await this.notificationService.getPushNotificationToken();
      }
      const user = await this.getUser(this.token);
      const config = await this.getConfiguration();

      if (user && config) {
        if (user.earlyAccess == true) {
          if (user.isReferalUsed == false && config.referral == true) {
            this.router.navigateByUrl('/referral');
          }
          else {
            this.router.navigateByUrl('/tabs/dashboard');
          }
        }
        else {
          this.router.navigateByUrl('/early-access');
        }
      }
      else {
        this.userService.signOut();
      }
    } catch (e) {
      if (e?.message === 'User is not confirmed.') {
        this.navCtrl.navigateForward(
          `/otp?email=${this.signInForm.controls.username.value}&doSend=true`
        );
      }

      this.errorShow = true;
      this.errorResp = e.message;
      // const toast = await this.toastController.create({
      //   message: e.message,
      //   duration: 2000,
      //   cssClass: 'ion-text-center',
      // });
      // toast.present();
    } finally {
      this.isLoading = false;
      this.signInForm.enable();
    }
  }

  async getUser(token?: string) {
    try {
      const userRes = await this.userService.getUser(token);
      if (userRes.status === this.CONSTANT.SUCCESS) {
        this.userService.setUserToStorage(userRes.data);
        return userRes.data;
      }
    } catch (e) {
      console.log('Error in fetching user data', e);
      return null;
    }
  }

  async getConfiguration() {
    try {
      const config = await this.configurationService.getConfiguration(true);
      return config;
    } catch (e) {
      console.log('Error in fetching configuration', e);
      this.userService.signOut();
      return null;
    }
  }
}
