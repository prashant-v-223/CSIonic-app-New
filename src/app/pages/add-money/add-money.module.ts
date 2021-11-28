import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoneyPageRoutingModule } from './add-money-routing.module';

import { AddMoneyPage } from './add-money.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMoneyPageRoutingModule,
    SharedModule
  ],
  declarations: [AddMoneyPage]
})
export class AddMoneyPageModule { }
