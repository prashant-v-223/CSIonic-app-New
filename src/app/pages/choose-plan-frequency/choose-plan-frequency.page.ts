import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  selectedTenure: number;
  week: any[] = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];
  monthlyDate = new Date().toISOString();
  startOfMonth = moment().format('YYYY-MM-DD');
  endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
  isOpened: boolean = true;
  daysInThisMonth = moment(this.monthlyDate, "YYYY-MM").daysInMonth();

  frequencyObject?: {
    type: 'daily' | 'weekly' | 'monthly';
    weekDay?:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';
    monthDay?: number;
  };
  isFrequencyValid = false;
  tenureYears = [];
  stepperSteps = "planFrequency";
  selectedDate: Date;
  config;

  constructor(
    private modalController: ModalController,
    private sipService: SIPService,
    private cdr: ChangeDetectorRef,
    private configurationService: ConfigurationService
  ) {
    this.sipService.currentStepper.subscribe((currentStepper: string) => {
      this.stepperSteps = currentStepper;
      if (this.stepperSteps === "addAmount")
        this.stepperSteps = "planFrequency";
    });
    this.package = this.sipService.getSIPData()?.package;

    if (!this.package) this.closeModal('error');
  }

  async ngOnInit() {
    this.coins = this.package.coins.map((coin) => coin.currencyId);
    this.onSelectFrequency('monthly');
    this.config = await this.configurationService.getConfiguration();
    //this.tenureYears = this.config.tenure;
    //this.onSelectTenure(0);
  }

  counter() {
    return new Array(this.daysInThisMonth);
  }

  onSelectFrequency(type) {
    this.selectFrequency = type?.detail?.value || type;
    this.frequencyObject = {
      type: this.selectFrequency,
    };

    if (this.selectFrequency === 'weekly') this.onSelectDay(this.selectedDay);
    else if (this.selectFrequency === 'monthly') this.onSelectDate(new Date());
    else this.updateValidity();
  }

  onSelectDay(day) {
    this.selectedDay = day;
    this.frequencyObject.weekDay = day;
    this.updateValidity();
  }

/*   onSelectTenure(index) {
    this.selectedTenure = this.tenureYears[index];
    this.updateValidity();
  } */

  onSelectDate(date) {
    this.frequencyObject.monthDay = (
      date.detail?.value ? new Date(date.detail.value) : new Date()
    ).getDate();
    this.selectedDate = date.detail?.value ? new Date(date.detail.value) : new Date();
    this.updateValidity();
  }

  updateValidity() {
    this.isFrequencyValid = this.sipService.isSIPFrequencyValid(
      this.frequencyObject
    );
    this.cdr.detectChanges();
  }

  async openNextStep() {
    if (this.stepperSteps === "tenure") {
      this.stepperSteps = "planFrequency";
    } else if (this.stepperSteps === "planFrequency") {
      this.stepperSteps = "addAmount";
    }
    if (this.stepperSteps === "addAmount") {
     // this.sipService.setSIPData('tenure', this.selectedTenure);
      this.sipService.setSIPData('plan-frequency', this.frequencyObject);
      if(this.selectFrequency === 'monthly'){
        this.sipService.setSIPData('selectedDate', this.selectedDate);
      }

      const amountModal = await this.modalController.create({
        component: AddAmountPage,
        id: 'AddMountModal',
      });
      await amountModal.present();

      const amountModalResult = await amountModal.onDidDismiss();

      if (amountModalResult?.data?.status)
        this.closeModal(amountModalResult.data.status);
    }
  }

  closeModal(status: 'dismissed' | 'success' | 'error') {
    if (this.stepperSteps === "addAmount" && status === 'dismissed') {
      this.stepperSteps = "planFrequency";
    /* } else if (this.stepperSteps === "planFrequency") {
      this.stepperSteps = "tenure"; */
    } else {
      this.modalController.dismiss(
        {
          status,
        },
        '',
        'FrequencyModal'
      );
    }
  }
}
