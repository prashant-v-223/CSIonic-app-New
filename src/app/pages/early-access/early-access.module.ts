import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EarlyAccessRoutingModule } from './early-access-routing.module';
import { EarlyAccessPage } from  './early-access.page';



@NgModule({
  declarations: [EarlyAccessPage],
  imports: [
    CommonModule,
    EarlyAccessRoutingModule
  ]
})
export class EarlyAccessModule { }
