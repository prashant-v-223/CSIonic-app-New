import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

export enum SIPStatus {
  REGISTRATION_FAILED = 'registrationFailed',
  WAITING_FOR_ESIGN = 'waitingForESign',
  SIGNING_SUCCESS = 'auth_success',
  SIGNING_FAILED = 'auth_failed',
}

@Injectable({
  providedIn: 'root',
})
export class SIPService {
  currentStepper = new Subject();

  private sipDataToCreate?: {
    tenure?: string;
    package?: any;
    interval?: {
      type: 'daily' | 'weekly' | 'monthly';
      weekDay?:
        | 'SUNDAY'
        | 'MONDAY'
        | 'TUESDAY'
        | 'WEDNESDAY'
        | 'THURSDAY'
        | 'FRIDAY'
        | 'SATURDAY';
      monthDay?: number;
    };
    installmentAmount?: number;
    selectedDate?: Date;
  };

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) {}

  getSIPData() {
    // returning a clone so that external cann't change this object
    return JSON.parse(JSON.stringify(this.sipDataToCreate));
  }

  setSIPData(
    step:
      | 'tenure'
      | 'package'
      | 'plan-frequency'
      | 'amount'
      | 'reset'
      | 'selectedDate',
    data: any
  ) {
    if (!this.sipDataToCreate) this.sipDataToCreate = {};

    switch (step) {
      case 'tenure':
        this.sipDataToCreate.tenure = data;
        break;

      case 'package':
        this.sipDataToCreate.package = data.package;
        break;

      case 'plan-frequency':
        this.sipDataToCreate.interval = {
          type: data.type,
        };
        if (data.type === 'weekly')
          this.sipDataToCreate.interval.weekDay = data.weekDay;
        if (data.type === 'monthly')
          this.sipDataToCreate.interval.monthDay = data.monthDay;
        break;

      case 'amount':
        this.sipDataToCreate.installmentAmount = data.installmentAmount;
        break;

      case 'selectedDate':
        this.sipDataToCreate.selectedDate = data;
        break;

      case 'reset':
        this.sipDataToCreate = null;
        break;
    }
  }

  isSIPDataValid(): boolean {
    return !!(
      this.sipDataToCreate.package &&
      this.isSIPFrequencyValid(this.sipDataToCreate.interval) &&
      this.sipDataToCreate.installmentAmount
    );
  }

  isSIPFrequencyValid(frequency: {
    type: 'daily' | 'weekly' | 'monthly';
    weekDay?: string;
    monthDay?: number;
  }): boolean {
    return !!(
      frequency.type &&
      // validate month
      (frequency.type === 'daily' ||
        (frequency.type === 'monthly' && frequency.monthDay) ||
        // validate week
        (frequency.type === 'weekly' && frequency.weekDay))
    );
  }

  addSIP() {
    if (!this.isSIPDataValid()) throw new Error('Invalid SIP data');

    const payload: any = this.getSIPData();
    payload.packageId = payload.package._id;
    delete payload.package;
    return this.api.postData(this.apiConfig.sip, payload);
  }

  getSIPs() {
    return this.api.getData(`${this.apiConfig.sip}`);
  }

  getSIPDetails(id: string) {
    return this.api.getData(`${this.apiConfig.sip}/${id}`);
  }

  getChartDetails(symbol: string,duration: string,interval: string) {
    return this.api.getData(`${this.apiConfig.chart}/?symbol=${symbol}&duration=${duration}&interval=${interval}`);
  }

  getChartDetailsPackage(packegeId:string,duration: string,interval: string) {
    return this.api.getData(`${this.apiConfig.chart}/${packegeId}?duration=${duration}&interval=${interval}`);
  }

  changeSIPStatus(id: string, statusObj: { status: SIPStatus }) {
    return this.api.putData(`${this.apiConfig.sip}/${id}/change-status`, statusObj);
  }

  getMandateDetails(sipId: string) {
    return this.api.getData(`${this.apiConfig.sip}/${sipId}/mandate`);
  }

  withdrawSIP(sipId: string) {
    return this.api.putData(`${this.apiConfig.sip}/${sipId}/withdrawal`,{});
  }
}
