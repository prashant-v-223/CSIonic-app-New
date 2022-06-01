import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportModelPage } from './support-model.page';

const routes: Routes = [
  {
    path: '',
    component: SupportModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportModelPageRoutingModule {}
