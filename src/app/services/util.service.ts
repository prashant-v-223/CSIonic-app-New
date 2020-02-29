import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private toastCtrl: ToastController
  ) { }

  async showToast(message: string = 'There was some problem, please try again', duration: number = 2000){
    const toast = await this.toastCtrl.create({
      message: 'There was some problem, please try again',
      duration: 2000
    });
    toast.present();
  }

  getFormattedDate(format?: string, date?: Date) {
    if (!date)
      date = new Date();
    if (!format)
      format = 'd/m/yyyy';
      
    if (format === 'd/m/yyyy')
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
}
