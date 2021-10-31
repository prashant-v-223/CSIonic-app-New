import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePlanFrequencyPage } from './choose-plan-frequency.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: ChoosePlanFrequencyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ChoosePlanFrequencyPage]
})
export class ChoosePlanFrequencyPageModule { }
