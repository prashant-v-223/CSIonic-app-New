import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'savings',
        loadChildren: '../savings/savings.module#SavingsPageModule'
      },
      {
        path: 'investment',
        loadChildren: '../investment/investment.module#InvestmentPageModule'
      },
      {
        path: 'goals',
        loadChildren: '../goals/goals.module#GoalsPageModule'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
