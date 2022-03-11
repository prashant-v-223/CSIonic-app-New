import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { COPY } from 'src/app/shared/helper/const';
import { PackagesService } from 'src/app/shared/services/packages.service';
import { SIPService } from 'src/app/shared/services/sip.service';

@Component({
  selector: 'app-sip-details',
  templateUrl: './sip-details.page.html',
  styleUrls: ['./sip-details.page.scss'],
})
export class SipDetailsPage implements OnInit {

  selectedTime: string = '3y';
  showLoader = true;

  packageId: string;
  packageDetails: any;

  packageCalculatedDetails = {
    returnPercentage: null,
    returnYears: null,
  };

  CONSTANT: any = COPY;

  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private packagesService: PackagesService,
    private sipService: SIPService
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: Params) => {
      this.packageId = params.packageId;
      this.getPackageDetails();
    });
  }

  async getPackageDetails() {
    if (!this.packageId)
      return;

    this.showLoader = true;
    try {
      const packageDetailsRes = await this.packagesService.getPackageDetails(this.packageId)
      if (packageDetailsRes.status === this.CONSTANT.SUCCESS && packageDetailsRes.data) {
        this.packageDetails = packageDetailsRes.data;
        this.fillPackageCalculatedDetails();
        this.showLoader = false;
      }
    } catch (e) {
      console.log('Error while getting package details', e);
      this.onBack();
    }
  }

  fillPackageCalculatedDetails() {
    this.packageCalculatedDetails.returnYears = this.packageCalculatedDetails.returnPercentage = null;

    if ('_3' in this.packageDetails.yearlyReturns) {
      this.packageCalculatedDetails.returnYears = 3;
      this.packageCalculatedDetails.returnPercentage = this.packageDetails.yearlyReturns['_3'];
    } else if ('_1' in this.packageDetails.yearlyReturns) {
      this.packageCalculatedDetails.returnYears = 1;
      this.packageCalculatedDetails.returnPercentage = this.packageDetails.yearlyReturns['_1'];
    }
  }

  onSelectTime(time) {
    this.selectedTime = time;
  }

  onCreateSIP() {
    this.sipService.setSIPData('package', {
      package: this.packageDetails
    });
    this.navCtrl.navigateForward('/choose-plan-frequency');
  }

  onBack() {
    this.navCtrl.navigateBack('/tabs/dashboard');
  }

}
