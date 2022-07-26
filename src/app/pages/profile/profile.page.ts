import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Auth } from 'aws-amplify';

import { UserService } from 'src/app/shared/services/user.service';
import { SupportModelPage } from '../common-design/support-model/support-model.page';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  user: any;
  dataReturned: any;

  constructor(
    private userService: UserService, private navCtrl: NavController,private modalController: ModalController
  )
  {
    this.user = this.userService.getUser().then((res) =>{
      this.user = res;
      this.userService.setUserToStorage(this.user.data);
      this.user = this.userService.getUserFromStorage();
    });
  }

  ionViewWillEnter()
  {
    this.user = this.userService.getUser().then((res) =>{
      this.user = res;
      this.userService.setUserToStorage(this.user.data);
      this.user = this.userService.getUserFromStorage();
    });
    if (!this.user) this.onBack();
  }

  signOut() {
    this.userService.signOut();
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: SupportModelPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
      }
    });
    return await modal.present();
  }

  onBack() {
    this.navCtrl.navigateBack('/tabs/profile');
  }
}
