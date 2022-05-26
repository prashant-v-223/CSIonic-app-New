import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { NavController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {

  constructor(private userService:UserService,private navCtrl:NavController) { }
  disabled : boolean = true;
  isLoading = false;
  ngOnInit() {}
  referralForm = new FormGroup({
    referralCode: new FormControl('',[Validators.required]),
  });

  addReferral()
  {
    this.isLoading = true;
    var referralCode = this.referralForm.controls['referralCode'].value;
    this.userService.addReferralCode(referralCode)
      .then((res) => {
      if (res.status =="SUCCESS")
      {
        this.isLoading = false;
        this.referralForm.reset();
        this.navCtrl.navigateRoot('/')
      }
      else
      {
        console.error("Something went wrong");
        this.isLoading = false;
      }
    })
    .catch( async (error) => {
      console.error(error);
      this.isLoading = false;
    })
    .finally(() => {
      this.isLoading = false;
    });
  }

}
