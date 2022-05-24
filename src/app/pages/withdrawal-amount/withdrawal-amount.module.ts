import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalAmountRoutingModule } from './withdrawal-amount-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawalAmountPage } from './withdrawal-amount.page';


@NgModule({
  declarations: [WithdrawalAmountPage],
  imports: [
    CommonModule,
    WithdrawalAmountRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule

  ]
})
export class WithdrawalAmountModule { }
