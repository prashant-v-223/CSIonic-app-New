import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessFailScreenPage } from './success-fail-screen.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessFailScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessFailScreenPageRoutingModule {}
