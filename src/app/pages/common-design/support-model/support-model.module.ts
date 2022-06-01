import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SupportModelPageRoutingModule } from './support-model-routing.module';
import { SupportModelPage } from './support-model.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportModelPageRoutingModule,
    SharedModule
  ],
  declarations: [SupportModelPage]
})
export class SupportModelPageModule {}
