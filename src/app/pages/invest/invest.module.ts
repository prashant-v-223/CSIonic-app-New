import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvestPageRoutingModule } from './invest-routing.module';

import { InvestPage } from './invest.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestPageRoutingModule,

    SharedModule
  ],
  declarations: [InvestPage]
})
export class InvestPageModule {}
