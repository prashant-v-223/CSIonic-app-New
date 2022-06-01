import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarlyAccessPage } from  './early-access.page';

const routes: Routes = [{
  path: '',
  component: EarlyAccessPage
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarlyAccessRoutingModule { }
