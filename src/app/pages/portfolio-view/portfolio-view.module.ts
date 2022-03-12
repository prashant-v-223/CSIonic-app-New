import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioViewPageRoutingModule } from './portfolio-view-routing.module';

import { PortfolioViewPage } from './portfolio-view.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChoosePlanFrequencyPage } from '../choose-plan-frequency/choose-plan-frequency.page';
import { AddAmountPage } from '../add-amount/add-amount.page';
import { SipCreatedPage } from '../sip-created/sip-created.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioViewPageRoutingModule,
    SharedModule
  ],
  declarations: [
    PortfolioViewPage,
    ChoosePlanFrequencyPage,
    SipCreatedPage,
    AddAmountPage
  ]
})
export class PortfolioViewPageModule {}
