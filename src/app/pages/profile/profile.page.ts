import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Auth } from 'aws-amplify';

import { UserService } from 'src/app/shared/services/user.service';
import { SupportModelPage } from '../common-design/support-model/support-model.page';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  user: any;
  dataReturned: any;


  constructor(
    private userService: UserService, private modalController: ModalController,private emailComposer:EmailComposer
  )
  {
    this.user = this.userService.getUserFromStorage();
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
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

}
