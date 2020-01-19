import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentPage } from './investment.page';

const routes: Routes = [
  {
    path: '',
    component: InvestmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentPageRoutingModule {}
