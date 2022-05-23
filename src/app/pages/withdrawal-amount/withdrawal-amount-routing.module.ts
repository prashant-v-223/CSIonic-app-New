import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawalAmountPage } from './withdrawal-amount.page';
const routes: Routes = [{
  path: '',
  component: WithdrawalAmountPage
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalAmountRoutingModule { }
