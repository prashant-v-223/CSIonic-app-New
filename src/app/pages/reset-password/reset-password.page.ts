import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { passwordRequirementMessage, passwordValidator } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: string;
  isLoading = false;

  readonly passwordRequirementMessage = passwordRequirementMessage;

  resetPasswordForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    password: new FormControl('', [Validators.required, passwordValidator]),
  });

  constructor(
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      this.email = params.email;

      if (!this.email) this.navCtrl.navigateBack('/');
    });
  }

  async resetPassword() {
    if (this.resetPasswordForm.invalid) return;

    this.isLoading = true;
    this.resetPasswordForm.disable();

    try {
      await Auth.forgotPasswordSubmit(
        this.email,
        this.resetPasswordForm.controls.code.value,
        this.resetPasswordForm.controls.password.value
      );
      this.showToast('Password reset successful');
      this.navCtrl.navigateRoot('/');
    } catch (e) {
      let errorMessage =
        'There was some problem while resetting password, please try again';
      if (e?.message) errorMessage = e.message;
      this.showToast(errorMessage);
    } finally {
      this.isLoading = false;
      this.resetPasswordForm.enable();
    }
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      cssClass: 'ion-text-center',
    });
    toast.present();
  }
}
