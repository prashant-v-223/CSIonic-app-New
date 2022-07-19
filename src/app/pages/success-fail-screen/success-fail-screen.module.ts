import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessFailScreenPageRoutingModule } from './success-fail-screen-routing.module';

import { SuccessFailScreenPage } from './success-fail-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessFailScreenPageRoutingModule
  ],
  declarations: [SuccessFailScreenPage]
})
export class SuccessFailScreenPageModule {}
