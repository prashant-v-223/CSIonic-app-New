import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularCoinsPageRoutingModule } from './popular-coins-routing.module';

import { PopularCoinsPage } from './popular-coins.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularCoinsPageRoutingModule,
    SharedModule
  ],
  declarations: [PopularCoinsPage]
})
export class PopularCoinsPageModule {}
