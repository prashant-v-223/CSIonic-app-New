import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmountWithdrawnPageRoutingModule } from './amount-withdrawn-routing.module';

import { AmountWithdrawnPage } from './amount-withdrawn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmountWithdrawnPageRoutingModule
  ],
  declarations: [AmountWithdrawnPage]
})
export class AmountWithdrawnPageModule {}
