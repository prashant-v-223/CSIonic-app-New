import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

import { COPY, COINS } from 'src/app/shared/helper/const';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { SIPService } from 'src/app/shared/services/sip.service';
import { ChoosePlanFrequencyPage } from '../choose-plan-frequency/choose-plan-frequency.page';

enum SIPSteps {
  FREQUENCY,
  AMOUNT,
  CREATED,
}
@Component({
  selector: 'app-portfolio-view',
  templateUrl: './portfolio-view.page.html',
  styleUrls: ['./portfolio-view.page.scss'],
})
export class PortfolioViewPage implements OnInit {
  CONSTANT = COPY;
  COINS = COINS;

  public segment: string = 'day';
  showLoader = true;

  id: string;
  view: 'sip' | 'package';

  sipDetails: any;
  packageDetails: any;

  packageCalculatedDetails = {
    coins: [],
    returnPercentage: null,
    returnYears: null,
  };

  SIPStepStatus = SIPSteps.FREQUENCY;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    public modalController: ModalController,
    private packagesService: PackagesService,
    private sipService: SIPService
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.view = this.router.url.startsWith('/sip') ? 'sip' : 'package';

      this.loadDetails();
    });
  }

  async loadDetails() {
    if (!this.id) {
      this.goBack();
      return;
    }

    this.showLoader = true;
    try {
      const res = await (this.view === 'sip'
        ? this.sipService.getSIPDetails(this.id)
        : this.packagesService.getPackageDetails(this.id));

      if (res.status === this.CONSTANT.SUCCESS && res.data) {
        if (this.view === 'sip') {
          this.sipDetails = res.data;
          this.packageDetails = this.sipDetails.packageId;
        } else {
          this.packageDetails = res.data;
        }

        this.fillPackageCalculatedDetails();
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting package details', e);
      this.goBack();
    }
  }

  fillPackageCalculatedDetails() {
    this.packageCalculatedDetails.coins = this.packageDetails.coins.map(
      (coin) => coin.currencyId
    );
    this.packageCalculatedDetails.returnYears =
      this.packageCalculatedDetails.returnPercentage = null;

    if ('_3' in this.packageDetails.yearlyReturns) {
      this.packageCalculatedDetails.returnYears = 3;
      this.packageCalculatedDetails.returnPercentage =
        this.packageDetails.yearlyReturns['_3'];
    } else if ('_1' in this.packageDetails.yearlyReturns) {
      this.packageCalculatedDetails.returnYears = 1;
      this.packageCalculatedDetails.returnPercentage =
        this.packageDetails.yearlyReturns['_1'];
    }
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  async openSIPStep() {
    if (this.view === 'sip') return;

    this.sipService.setSIPData('reset', null);

    // step 1
    this.sipService.setSIPData('package', {
      package: this.packageDetails,
    });

    // step 2
    const frequencyModal = await this.modalController.create({
      component: ChoosePlanFrequencyPage,
      id: 'FrequencyModal',
    });
    await frequencyModal.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/dashboard');
  }
}
