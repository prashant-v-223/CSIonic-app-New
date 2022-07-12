import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { COPY } from 'src/app/shared/helper/const';
import { alphabetRegExp, passwordRequirementMessage, passwordValidator , alphabetValidator } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  CONSTANT: any = COPY;
  isLoading = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  readonly passwordRequirementMessage = passwordRequirementMessage;

  phoneNumberCountryCodes = [
    {
      country: 'India',
      code: '+91',
    },
  ];

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  signUpForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z0-9_@.]+'),Validators.email]),
    password: new FormControl(null, [Validators.required, passwordValidator]),
    given_name: new FormControl(null,[ Validators.required, Validators.pattern('^[a-zA-Z]+')]),
    family_name: new FormControl(null, [ Validators.required, Validators.pattern('^[a-zA-Z]+')]),
    phone_number_country_code: new FormControl('+91', Validators.required),
    phone_number: new FormControl(null, [
      Validators.required,
      Validators.pattern('^\\d{10}$'),
    ]),
    agreeOnTermsAndConditions: new FormControl(null, Validators.requiredTrue),
  });

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async signUp() {
    if (this.signUpForm.invalid) return;

    this.isLoading = true;
    this.signUpForm.disable();

    try {
      const formData: any = this.signUpForm.value;
      formData.attributes = {
        given_name: this.signUpForm.controls.given_name.value,
        family_name: this.signUpForm.controls.family_name.value,
        phone_number: `${this.signUpForm.controls.phone_number_country_code.value}${this.signUpForm.controls.phone_number.value}`,
      };
      delete formData.given_name;
      delete formData.family_name;
      delete formData.phone_number_country_code;
      delete formData.phone_number;
      delete formData.agreeOnTermsAndConditions;

      await Auth.signUp(formData);
      this.navCtrl.navigateForward(
        `/otp?email=${this.signUpForm.controls.username.value}`
      );
    } catch (e) {
      let errorMessage =
        'There was some problem while signing up, please try again';
      if (e?.message) errorMessage = e.message;
      const toast = await this.toastController.create({
        message: e.message,
        duration: 3000,
        cssClass: 'ion-text-center',
      });
      toast.present();
    } finally {
      this.isLoading = false;
      this.signUpForm.enable();
    }
  }

 /*  keyPressAlphabet(event) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  } */
}
