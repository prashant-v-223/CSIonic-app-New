import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

import { Auth } from 'aws-amplify';
import { NavController } from '@ionic/angular';
import { ConfigurationService } from './configuration.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly USER_STORAGE_KEY = 'user';
  private subject = new BehaviorSubject<any>([]);
  portfolio$: Observable<any> = this.subject.asObservable();

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration,
    private navCtrl: NavController,
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) {
    this.setHeaderToken();
    this.getPortfolioDataDetails$();
  }

  setUserToStorage(user: any) {
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
  }

  getUserFromStorage() {
    return JSON.parse(localStorage.getItem(this.USER_STORAGE_KEY));
  }

  setHeaderToken() {
    return this.api.setHeaderToken();
  }

  getUser(token?: string) {
    const tokenData = { 'fcmToken': token };
    return this.api.putData(this.apiConfig.user, tokenData);
  }

  verifySelfie(formData: FormData) {
    return this.api.postData(this.apiConfig.verifySelfie, formData);
  }

  verifyProof(formData: FormData) {
    return this.api.postData(this.apiConfig.verifyProof, formData);
  }

  signOut() {
    localStorage.clear();
    this.configurationService.clearConfiguration();
    setTimeout(async () => {
      await Auth.signOut({
        global: true
      });
      this.navCtrl.navigateRoot('/onboard');
    }, 500);
  }

  //User Bank Details Get API
  async getUserBankDetails(userId: string) {
    try {
      const depositData = await this.api.getData(this.apiConfig.bankAccount + '/' + userId);
      return depositData;
    }
    catch (e) {
      throw e;
    }
  }

  async addReferralCode(referralCode: string, referralCheck: Boolean) {
    try {
      const referralCodeData = { referralCode: referralCode, isReferalUsed: referralCheck };
      const referralData = await this.api.postData(this.apiConfig.referralCode, referralCodeData);
      return referralData;
    }
    catch (e) {
      throw e;
    }
  }

  async getEarlyAccessDetails(userId: string) {
    try {
      return await this.api.getData(this.apiConfig.earlyAccessCheck + '?_id=' + userId);
    }
    catch (e) {
      throw e;
    }
  }

  async getPortfolioDataDetails() {
    try {
      return this.api.getData(`${this.apiConfig.portfolio}`);
    }
    catch (e) {
      throw e;
    }

  }

  getPortfolioDataDetails1(): Observable<any> {
    return this.http.get<any>(this.apiConfig.apiUrl + 'portfolio', this.api.getHeader())
      .pipe(
        map(res => res),
        shareReplay(),
      )
  }

  public getPortfolioDataDetails$(): Observable<any> {
    return this.getPortfolioDataDetails1()
      .pipe(
        map(response => response),
        catchError(err => {
          const message = "Error Investments";
          return throwError(err);
        }),
        tap(portfolio$ => this.subject.next(portfolio$))
      )
  }
}
