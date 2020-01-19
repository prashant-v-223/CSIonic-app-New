import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarModule } from 'ion2-calendar';

import { SavingsPageRoutingModule } from './savings-routing.module';
import { SavingsPage } from './savings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    SavingsPageRoutingModule
  ],
  declarations: [SavingsPage]
})
export class SavingsPageModule {}
