import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Auth } from 'aws-amplify';
import { Subject, timer } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  email: string;
  isLoading = false;
  isSendingOTP = false;

  otpCtrl = new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);

  resendCountDown;

  constructor(
    private navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      this.email = params.email;

      if (!this.email) {
        this.navCtrl.navigateBack('/');
        return;
      }

      if (params.doSend) this.resendOTP();
      else this.startCountDown();
    });
  }

  startCountDown() {
    this.resendCountDown = 59;
    timer(1000, 1000)
      .pipe(
        takeWhile(() => !!this.resendCountDown),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.resendCountDown--;
      });
  }

  async verifyOTP() {
    if (this.otpCtrl.invalid) return;

    this.isLoading = true;
    this.otpCtrl.disable();

    try {
      console.log(this.email);
      await Auth.confirmSignUp(this.email, this.otpCtrl.value);
      this.showToast('Verification successful');
      this.navCtrl.navigateRoot('/');
    } catch (e) {
      if (
        e?.message === 'User cannot be confirmed. Current status is CONFIRMED'
      ) {
        this.showToast("You're already verified");
        this.navCtrl.navigateRoot('/');
        return;
      }
      this.handleError(e);
    } finally {
      this.isLoading = false;
      this.otpCtrl.enable();
    }
  }

  async resendOTP() {
    this.isSendingOTP = true;

    try {
      await Auth.resendSignUp(this.email);
      this.startCountDown();
      this.showToast(`OTP sent to ${this.email}`);
    } catch (e) {
      console.log('e: ', e);
      this.handleError(e);
    } finally {
      this.isSendingOTP = false;
    }
  }

  handleError(error) {
    let errorMessage =
      'There was some problem while verifiying OTP, please try again';
    if (error?.message) errorMessage = error.message;
    this.showToast(error.message);
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      cssClass: 'ion-text-center',
    });
    toast.present();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
