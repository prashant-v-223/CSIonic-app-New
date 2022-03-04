import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawAmountPage } from './withdraw-amount.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawAmountPageRoutingModule {}
