import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SupportModelPage } from '../common-design/support-model/support-model.page';


@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {

  dataReturned: any;

  constructor(
    public modalController: ModalController
  ) { }

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

}
