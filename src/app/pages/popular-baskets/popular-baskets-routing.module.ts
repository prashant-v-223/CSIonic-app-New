import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularBasketsPage } from './popular-baskets.page';

const routes: Routes = [
  {
    path: '',
    component: PopularBasketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularBasketsPageRoutingModule {}
