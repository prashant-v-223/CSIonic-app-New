import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularCoinsPage } from './popular-coins.page';

const routes: Routes = [
  {
    path: '',
    component: PopularCoinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularCoinsPageRoutingModule {}
