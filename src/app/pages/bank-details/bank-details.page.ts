import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { BANK_ACCOUNT_TYPE, COPY } from 'src/app/shared/helper/const';
import { UserService } from 'src/app/shared/services/user.service';
import { BankDetailsService } from './bank-details.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.page.html',
  styleUrls: ['./bank-details.page.scss'],
})
export class BankDetailsPage implements OnInit {
  userId: string;

  bankDetails: any;
  accountTypeLabel = '';
  isLoading: boolean = false;
  CONSTANT: any = COPY;

  mode: 'view' | 'edit' = 'view';

  accountTypes: any = BANK_ACCOUNT_TYPE;
  bankDetailsForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private bankService: BankDetailsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) {
    this.initForm();
  }

  ngOnInit() {
    const user = this.userService.getUserFromStorage();
    if (!user) this.onBack();

    this.userId = user._id;
    this.getBankDetails();
  }

  getBankDetails() {
    this.isLoading = true;
    this.bankService
      .getAccountDetails(this.userId)
      .then((res) => {
        if (res.status === this.CONSTANT.SUCCESS) {
          this.bankDetails = res.data;
          this.mode = 'view';
        } else this.mode = 'edit';
      })
      .catch((error) => {
        console.log(
          'There was some error while getting bank account details',
          error
        );
        this.mode = 'edit';
      })
      .finally(() => {
        this.setAccountTypeLabel();
        this.isLoading = false;
      });
  }

  setAccountTypeLabel() {
    if (!this.bankDetails?.accountType) {
      this.accountTypeLabel = '';
      return;
    }
    const found = this.accountTypes.find(
      (acType) => acType.value === this.bankDetails.accountType
    );
    if (!found) this.accountTypeLabel = '';
    this.accountTypeLabel = found.label;
  }

  toggleMode() {
    if (this.mode === 'view') {
      if (this.bankDetails) this.patchFormValue();
      this.mode = 'edit';
    } else {
      if (this.bankDetails) this.bankDetailsForm.reset();
      this.mode = 'view';
    }
  }

  initForm() {
    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl('', [Validators.required]),
      holderName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{9,18}$'),
      ]),
      IFSC: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'), // reference: https://www.geeksforgeeks.org/how-to-validate-ifsc-code-using-regular-expression/
      ]),
      accountType: new FormControl('', [Validators.required]),
    });
  }

  patchFormValue() {
    this.bankDetailsForm.patchValue({
      bankName: this.bankDetails.bankName,
      holderName: this.bankDetails.holderName,
      accountNumber: this.bankDetails.accountNumber,
      IFSC: this.bankDetails.IFSC,
      accountType: this.bankDetails.accountType,
    });
  }

  async save() {
    if (this.bankDetailsForm.invalid) return;

    this.bankDetailsForm.disable();
    const data = this.bankDetailsForm.value;

    let addUpdateResponse = null;
    try {
      if (this.bankDetails?._id) {
        addUpdateResponse = await this.bankService.updateAccountDetails(
          this.bankDetails._id,
          data
        );
      } else {
        addUpdateResponse = await this.bankService.addAccountDetails(data);
      }

      if (
        addUpdateResponse.status === this.CONSTANT.SUCCESS &&
        addUpdateResponse.data
      ) {
        this.getBankDetails();
        this.mode = 'view';

        const toast = await this.toastController.create({
          message: 'Verification successful.',
          duration: 2000,
        });
        toast.present();
      }
    } catch (e) {
      const errorInfo = await this.alertCtrl.create({
        header: 'Verification unsuccessful',
        message: `There was some problem in verification process. Please check the details again, correctify (if required) and try again.`,
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
          },
        ],
      });
      await errorInfo.present();
    } finally {
      this.bankDetailsForm.enable();
    }
  }

  async showInfoModal() {
    const accessInfoAlert = await this.alertCtrl.create({
      header: 'IFSC code',
      message: `<ul class="pl-3">
          <li>It should be 11 characters long.</li>
          <li>The first four characters should be upper case alphabets.</li>
          <li>The fifth character should be 0.</li>
          <li>The last six characters usually numeric, but can also be alphabetic.</li>
        </ul>`,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        },
      ],
      backdropDismiss: false,
    });
    await accessInfoAlert.present();
  }

  onBack() {
    this.navCtrl.navigateBack('/tabs/profile');
  }

  ngOnDestroy() {}
}
