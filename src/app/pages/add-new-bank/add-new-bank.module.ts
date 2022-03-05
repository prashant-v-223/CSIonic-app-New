import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewBankPageRoutingModule } from './add-new-bank-routing.module';

import { AddNewBankPage } from './add-new-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewBankPageRoutingModule
  ],
  declarations: [AddNewBankPage]
})
export class AddNewBankPageModule {}
