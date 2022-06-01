import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForceAppUpdatePageRoutingModule } from './force-app-update-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ForceAppUpdatePage } from './force-app-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForceAppUpdatePageRoutingModule,
    SharedModule
  ],
  declarations: [ForceAppUpdatePage]
})
export class ForceAppUpdatePageModule {}
