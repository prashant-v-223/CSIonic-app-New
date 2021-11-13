import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SipDetailsPageRoutingModule } from './sip-details-routing.module';

import { SipDetailsPage } from './sip-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SipDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [SipDetailsPage]
})
export class SipDetailsPageModule { }
