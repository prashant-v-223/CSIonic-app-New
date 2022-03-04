import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortfolioViewPageRoutingModule } from './portfolio-view-routing.module';

import { PortfolioViewPage } from './portfolio-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioViewPageRoutingModule
  ],
  declarations: [PortfolioViewPage]
})
export class PortfolioViewPageModule {}
