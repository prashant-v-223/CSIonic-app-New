import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'menu',
    loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'sip-details',
    loadChildren: () => import('../sip-details/sip-details.module').then(m => m.SipDetailsPageModule)
  },
  {
    path: 'add-money',
    loadChildren: () => import('../add-money/add-money.module').then(m => m.AddMoneyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
