import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';


import {
  ModalController,
  NavController,
  NavParams
  } from '@ionic/angular';
@Component({
  selector: 'app-support-model',
  templateUrl: './support-model.page.html',
  styleUrls: ['./support-model.page.scss'],
})
export class SupportModelPage implements OnInit {

  modalTitle: string;
  modelId: number;
  supportForm : FormGroup;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private navCtrl: NavController,private emailComposer:EmailComposer
  ) { }

  ngOnInit() {
    this.supportForm = new FormGroup({
      mailSubject: new FormControl('',[Validators.required]),
      mailBody: new FormControl('',[Validators.required]),
    });
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {

  }

  async openEmail()
  {
    const email:EmailComposerOptions = {
        to: 'yash.technocomet@gmail.com',
        cc: 'adatiyayashu1909@gmail.com',
        subject: 'My first email',
        body: 'This is testing',
    }
    await this.emailComposer.open(email);
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
