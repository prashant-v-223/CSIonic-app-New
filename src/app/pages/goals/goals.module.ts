import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { GoalsPageRoutingModule } from './goals-routing.module';

import { GoalsPage } from './goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalsPageRoutingModule,

    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#3880ff",
      innerStrokeColor: "#a2a4ab",
      animationDuration: 300,
    })
  ],
  declarations: [GoalsPage]
})
export class GoalsPageModule {}
