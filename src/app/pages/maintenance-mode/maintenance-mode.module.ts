import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceModePageRoutingModule } from './maintenance-mode-routing.module';

import { MaintenanceModePage } from './maintenance-mode.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceModePageRoutingModule,
    SharedModule
  ],
  declarations: [MaintenanceModePage]
})
export class MaintenanceModePageModule {}
