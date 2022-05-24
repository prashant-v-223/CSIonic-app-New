import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositAmountRoutingModule } from './deposit-amount-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DepositAmountPage } from './deposit-amount.page';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DepositAmountPage],
  imports: [
    CommonModule,
    DepositAmountRoutingModule,
    FormsModule,
    IonicModule,
    SharedModule
  ]
})
export class DepositAmountModule { }
