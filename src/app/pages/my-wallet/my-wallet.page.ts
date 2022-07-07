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
  user : any = [];
  wallet
  async ngOnInit() {
    this.user = await this.userService.getUser();
    await this.userService.setUserToStorage(this.user.data);
    this.user = await this.userService.getUserFromStorage();
    if (!this.user) this.onBack();
    this.getTransactionList();
  }

  async ionViewWillEnter()
  {
    this.getTransactionList();
    this.user = await this.userService.getUser();
    await this.userService.setUserToStorage(this.user.data);
    this.user = await this.userService.getUserFromStorage();
    console.log(this.user);
    if (!this.user) this.onBack();
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
