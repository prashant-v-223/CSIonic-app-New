import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SipCreatedPage } from './sip-created.page';

const routes: Routes = [
  {
    path: '',
    component: SipCreatedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SipCreatedPageRoutingModule {}
