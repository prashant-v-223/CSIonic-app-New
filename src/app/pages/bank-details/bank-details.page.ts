import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { COPY } from 'src/app/shared/helper/const';
import { BankDetailsService } from './bank-details.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.page.html',
  styleUrls: ['./bank-details.page.scss'],
})
export class BankDetailsPage implements OnInit {

  subscriptions: any = {
    userId: null
  };
  userId: string;
  bankDetails: any;
  isLoading: boolean = false;
  CONSTANT: any = COPY;
  constructor(
    private navCtrl: NavController,
    private bankService: BankDetailsService,
    private route: ActivatedRoute,
  ) {
    this.subscriptions.userId = this.route.params.subscribe(data => {
      if (data && data.id) {
        this.userId = data.id;
        this.getBankDetails();
      }
    });
  }

  ngOnInit() {
  }

  getBankDetails() {
    this.isLoading = true;
    this.bankService.getAccountDetails(this.userId).then(res => {
      if (res.status === this.CONSTANT.SUCCESS) {
        this.bankDetails = res.data;
        this.isLoading = false;
      }
    }).catch(error => {
      console.error("Cannot get details : ", error);
      this.isLoading = false;
    });
  }

  onUpdateDetails() {
    this.navCtrl.navigateForward(['/dashboard/bank-verification', { id: this.userId }]);
  }

  onBack() {
    this.navCtrl.navigateForward('/dashboard/menu');
  }

  ngOnDestroy() {
    for (const sub in this.subscriptions) {
      if (this.subscriptions[sub]) {
        this.subscriptions[sub].unsubscribe();
      }
    }
  }
}
