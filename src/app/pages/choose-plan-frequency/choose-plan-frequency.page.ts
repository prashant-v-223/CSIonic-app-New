import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { SIPService } from 'src/app/shared/services/sip.service';
import { AddAmountPage } from '../add-amount/add-amount.page';

@Component({
  selector: 'app-choose-plan-frequency',
  templateUrl: './choose-plan-frequency.page.html',
  styleUrls: ['./choose-plan-frequency.page.scss'],
})
export class ChoosePlanFrequencyPage implements OnInit {

  package: any;
  coins = [];

  selectFrequency: 'daily' | 'weekly' | 'monthly' = 'daily';
  selectedDay: any;
  week: any[] = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  monthlyDate = new Date().toISOString();
  isOpened: boolean = true;

  frequencyObject?: {
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
  isFrequencyValid = false;

  constructor(
    private modalController: ModalController,
    private sipService: SIPService,
    private cdr: ChangeDetectorRef
  ) {
    this.package = this.sipService.getSIPData()?.package;

    if (!this.package)
      this.closeModal('error');
  }

  ngOnInit() {
    this.coins = this.package.coins.map(coin => coin.currencyId);
    this.onSelectFrequency('daily');
  }

  onSelectFrequency(type) {
    this.selectFrequency = type?.detail?.value || type;
    this.frequencyObject = {
      type: this.selectFrequency
    };
    
    if (this.selectFrequency === 'weekly')
      this.onSelectDay(this.selectedDay);
    else if (this.selectFrequency === 'monthly')
      this.onSelectDate(new Date());
    else
      this.updateValidity();
  }

  onSelectDay(day) {
    this.selectedDay = day;
    this.frequencyObject.weekDay = day;
    this.updateValidity();
  }

  onSelectDate(date) {
    this.frequencyObject.monthDay = (date.detail?.value ? new Date(date.detail.value) : new Date()).getDate();
    this.updateValidity();
  }

  updateValidity() {
    this.isFrequencyValid = this.sipService.isSIPFrequencyValid(this.frequencyObject);
    this.cdr.detectChanges();
  }

  async openNextStep() {
    this.sipService.setSIPData('plan-frequency', this.frequencyObject);

    const amountModal = await this.modalController.create({
      component: AddAmountPage,
      id: 'AddMountModal'
    });
    await amountModal.present();

    const amountModalResult = await amountModal.onDidDismiss();
    console.log('amountModalResult: ', amountModalResult);

    if (['success', 'error'].indexOf(amountModalResult?.data.status) !== -1)
      this.closeModal(amountModalResult?.data.status);
  }

  closeModal(status: 'dismissed'|'success'|'error') {
    this.modalController.dismiss({
      status
    }, '', 'FrequencyModal');
  }
}
