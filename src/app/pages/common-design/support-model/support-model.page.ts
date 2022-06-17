import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailComposer } from 'capacitor-email-composer';
import { environment } from "src/environments/environment";


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
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.supportForm = new FormGroup({
      mailSubject: new FormControl('',[Validators.required]),
      mailBody: new FormControl('',[Validators.required]),
    });
    //console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {

  }

  async openEmail() {
    let emailOps = {
      "to": environment.TO_EMAIL,
      "cc": environment.CC_EMAIL,
      "subject": this.supportForm.controls['mailSubject'].value,
      "body": this.supportForm.controls['mailBody'].value,
    };
    EmailComposer.open(emailOps);
    // await this.emailComposer.open(email);
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
