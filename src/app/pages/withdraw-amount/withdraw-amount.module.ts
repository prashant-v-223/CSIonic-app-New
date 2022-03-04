import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawAmountPageRoutingModule } from './withdraw-amount-routing.module';

import { WithdrawAmountPage } from './withdraw-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawAmountPageRoutingModule
  ],
  declarations: [WithdrawAmountPage]
})
export class WithdrawAmountPageModule {}
