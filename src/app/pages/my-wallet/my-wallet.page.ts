import { Component, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/shared/services/transactions.service';
import {  AlertController,  NavController,  ToastController,} from '@ionic/angular';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {

  constructor(private navCtrl: NavController,private userService: UserService,public toastController: ToastController,private alertCtrl: AlertController,private transactionService:TransactionsService) { }
  transactionList : any[] = [];

  ngOnInit() {
    const user = this.userService.getUserFromStorage();
    if (!user) this.onBack();
    this.getTransactionList();
  }
  async getTransactionList()
  {
    try
    {
        this.transactionList = await this.transactionService.transactionList();
        this.transactionList = this.transactionList['data'];
    }
    catch (e)
    {
      const toast = await this.toastController.create({
        message: e,
        duration: 2000,
      });
      await toast.present();
    }
  }

  onBack() {
    this.navCtrl.navigateBack('/tabs/profile');
  }
}
