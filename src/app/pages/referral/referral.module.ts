import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReferralRoutingModule } from './referral-routing.module';
import { ReferralPage } from  './referral.page';



@NgModule({
  declarations: [ReferralPage],
  imports: [
    CommonModule,
    ReferralRoutingModule,
    FormsModule,
    IonicModule,
    SharedModule
  ]
})
export class ReferralModule { }
