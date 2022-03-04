import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioDetailsPage } from './portfolio-details.page';

const routes: Routes = [
  {
    path: '',
    component: PortfolioDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioDetailsPageRoutingModule {}
