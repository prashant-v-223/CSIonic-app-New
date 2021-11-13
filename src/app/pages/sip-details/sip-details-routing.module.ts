import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SipDetailsPage } from './sip-details.page';

const routes: Routes = [
  {
    path: '',
    component: SipDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SipDetailsPageRoutingModule {}
