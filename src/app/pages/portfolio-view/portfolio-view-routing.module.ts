import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioViewPage } from './portfolio-view.page';

const routes: Routes = [
  {
    path: '',
    component: PortfolioViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioViewPageRoutingModule {}
