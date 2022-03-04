import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmountWithdrawnPage } from './amount-withdrawn.page';

const routes: Routes = [
  {
    path: '',
    component: AmountWithdrawnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmountWithdrawnPageRoutingModule {}
