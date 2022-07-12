import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SipTransactionListPageRoutingModule } from './sip-transaction-list-routing.module';

import { SipTransactionListPage } from './sip-transaction-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SipTransactionListPageRoutingModule
  ],
  declarations: [SipTransactionListPage]
})
export class SipTransactionListPageModule {}
