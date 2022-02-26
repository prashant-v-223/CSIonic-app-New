import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../home/home.page';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: 'menu',
    loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'sip-details/:packageId',
    loadChildren: () => import('../sip-details/sip-details.module').then(m => m.SipDetailsPageModule)
  },
  {
    path: 'add-money',
    loadChildren: () => import('../add-money/add-money.module').then(m => m.AddMoneyPageModule)
  },
  {
    path: 'transaction-list',
    loadChildren: () => import('../transaction-list/transaction-list.module').then(m => m.TransactionListPageModule)
  },
  {
    path: 'bank-details',
    loadChildren: () => import('../bank-details/bank-details.module').then(m => m.BankDetailsPageModule)
  },
  {
    path: 'kyc-document',
    loadChildren: () => import('../kyc-document/kyc-document.module').then(m => m.KYCDocumentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
