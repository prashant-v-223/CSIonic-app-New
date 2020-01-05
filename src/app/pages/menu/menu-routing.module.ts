import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,

    children: [
      {
        path: 'tabs',
        loadChildren: '../tabs/tabs.module#TabsPageModule'
      },
      {
        path: '',
        redirectTo: 'tabs',
        pathMatch: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
