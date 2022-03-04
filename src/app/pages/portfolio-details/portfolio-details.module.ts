import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioDetailsPageRoutingModule } from './portfolio-details-routing.module';

import { PortfolioDetailsPage } from './portfolio-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioDetailsPageRoutingModule
  ],
  declarations: [PortfolioDetailsPage]
})
export class PortfolioDetailsPageModule {}
