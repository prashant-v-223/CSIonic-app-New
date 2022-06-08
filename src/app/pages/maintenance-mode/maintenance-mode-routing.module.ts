import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceModePage } from './maintenance-mode.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceModePageRoutingModule {}
