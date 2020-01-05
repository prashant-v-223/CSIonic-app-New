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
        path: 'dashboard1',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'dashboard2',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'dashboard3',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
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
