import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BANK_ACCOUNT_TYPE, COPY } from 'src/app/shared/helper/const';
import { BankDetailsService } from '../bank-details/bank-details.service';

@Component({
  selector: 'app-bank-verification',
  templateUrl: './bank-verification.page.html',
  styleUrls: ['./bank-verification.page.scss'],
})
export class BankVerificationPage implements OnInit {

  accountTypes: any = BANK_ACCOUNT_TYPE;
  bankDetailsForm: FormGroup;
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
    this.initForm();
  }

  initForm() {
    this.bankDetailsForm = new FormGroup({
      holderName: new FormControl("", [Validators.required]),
      acNumber: new FormControl("", [Validators.required]),
      ifscCode: new FormControl("", [Validators.required]),
      acType: new FormControl("", [Validators.required]),
    });
  }

  patchFormValue() {
    this.bankDetailsForm.patchValue({
      holderName: this.bankDetails.holderName,
      acNumber: this.bankDetails.accountNumber,
      ifscCode: this.bankDetails.IFSC,
      acType: this.bankDetails.accountType,
    });
  }

  getBankDetails() {
    this.isLoading = true;
    this.bankService.getAccountDetails(this.userId).then(res => {
      if (res.status === this.CONSTANT.SUCCESS) {
        this.bankDetails = res.data;
        this.patchFormValue();
        this.isLoading = false;
      }
    }).catch(error => {
      console.error("Cannot get details : ", error);
      this.isLoading = false;
    });
  }
  onBankVerification() {
    if (this.bankDetailsForm.valid) {
      const data = {
        userId: "61c6f8683f2c6a2b683c2744",
        accountNumber: this.bankDetailsForm.get("acNumber").value.toString(),
        holderName: this.bankDetailsForm.get("holderName").value,
        IFSC: this.bankDetailsForm.get("ifscCode").value.toString(),
        accountType: this.bankDetailsForm.get("acType").value,
      };
      this.isLoading = true;
      this.bankService.addEditAccountDetails(data, this.userId).then(res => {
        console.log("save details : ", res);
        if (res.status === this.CONSTANT.SUCCESS) {
          const userData = {
            id: res.data.userId
          };
          localStorage.setItem('userDetails', JSON.stringify(userData));
          this.navCtrl.navigateForward(['/dashboard/bank-details', { id: res.data.userId }]);
          this.isLoading = false;

        }
      }).catch(error => {
        console.error("Cannot add details : ", error);
        this.isLoading = false;
      });
    }
  }

  onBack() {
    this.navCtrl.navigateForward('/dashboard/menu');
  }

}
