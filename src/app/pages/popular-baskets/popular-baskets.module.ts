import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularBasketsPageRoutingModule } from './popular-baskets-routing.module';

import { PopularBasketsPage } from './popular-baskets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularBasketsPageRoutingModule
  ],
  declarations: [PopularBasketsPage]
})
export class PopularBasketsPageModule {}
