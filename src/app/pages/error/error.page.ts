import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { Subscription } from 'rxjs';
import { AvailableErrorMessage, ErrorEnum, ErrorMessage } from 'src/app/shared/types/error';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  errorEnum = ErrorEnum;
  errorType: ErrorEnum;
  redirect: string;
  isLoading: boolean = false;

  get errorMessage(): ErrorMessage {
    return AvailableErrorMessage[this.errorType || this.errorEnum.SOMETHING_WENT_WRONG];
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((param: Params) => {
      this.errorType = param['errorType'];
    });

    this.activatedRoute.queryParamMap.subscribe((param: ParamMap) => {
      this.redirect = param.has('redirect') ? param.get('redirect') : null;
    });
  }

  async handleButtonClick() {
    this.isLoading = true;
    if (this.errorEnum.NO_INTERNET) {
      const status = await Network.getStatus();
      if (!status.connected) {
        this.isLoading = false;
        return;
      }
    }

    this.router.navigateByUrl(this.redirect || '/', { replaceUrl: true });
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length) {
      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }
    }
  }
}
