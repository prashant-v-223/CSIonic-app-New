import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SipTransactionListPage } from './sip-transaction-list.page';

const routes: Routes = [
  {
    path: '',
    component: SipTransactionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SipTransactionListPageRoutingModule {}
