import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForceAppUpdatePage } from './force-app-update.page';

const routes: Routes = [
  {
    path: '',
    component: ForceAppUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForceAppUpdatePageRoutingModule {}
