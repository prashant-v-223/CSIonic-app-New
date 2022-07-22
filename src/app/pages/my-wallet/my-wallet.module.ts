import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyWalletPageRoutingModule } from './my-wallet-routing.module';

import { MyWalletPage } from './my-wallet.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyWalletPageRoutingModule,
    SharedModule
  ],
  declarations: [MyWalletPage]
})
export class MyWalletPageModule {}
