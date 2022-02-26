import { Injectable } from '@angular/core';
import { ApiCallService } from 'src/app/services/apis/api-call.service';
import { ApiConfiguration } from 'src/app/services/apis/configuration';

@Injectable({
  providedIn: 'root',
})
export class SIPService {
  private sipDataToCreate?: {
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
  };

  constructor(
    private api: ApiCallService,
    private apiConfig: ApiConfiguration
  ) {}

  getSIPData() {
    // returning a clone so that external cann't change this object
    return JSON.parse(JSON.stringify(this.sipDataToCreate));;
  }

  setSIPData(
    step: 'package' | 'plan-frequency' | 'amount' | 'reset',
    data: any
  ) {
    if (!this.sipDataToCreate) this.sipDataToCreate = {};

    switch (step) {
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

      case 'reset':
        this.sipDataToCreate = null;
        break;
    }
    console.log('this.sipDataToCreate: ', this.sipDataToCreate);

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
}
