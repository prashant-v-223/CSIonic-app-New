import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  usernameCtrl = new FormControl(null, [Validators.required, Validators.email]);
  isLoading = false;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async sendInstructions() {
    if (this.usernameCtrl.invalid) return;

    this.isLoading = true;
    this.usernameCtrl.disable();

    try {
      await Auth.forgotPassword(this.usernameCtrl.value);
      this.navCtrl.navigateForward(
        `/reset-password?email=${this.usernameCtrl.value}`
      );
    } catch (e) {
      let errorMessage =
        'There was some problem while sending reset password code, please try again';
      if (e?.message) errorMessage = e.message;
      const toast = await this.toastController.create({
        message: errorMessage,
        duration: 3000,
        cssClass: 'ion-text-center',
      });
      toast.present();
    } finally {
      this.isLoading = false;
      this.usernameCtrl.enable();
    }
  }
}
