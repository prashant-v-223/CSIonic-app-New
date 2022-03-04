import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SipCreatedPageRoutingModule } from './sip-created-routing.module';

import { SipCreatedPage } from './sip-created.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SipCreatedPageRoutingModule
  ],
  declarations: [SipCreatedPage]
})
export class SipCreatedPageModule {}
