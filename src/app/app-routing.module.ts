import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'choose-plan',
    loadChildren: () => import('./pages/choose-plan/choose-plan.module').then(m => m.ChoosePlanPageModule)
  },
  {
    path: 'choose-plan-frequency',
    loadChildren: () => import('./pages/choose-plan-frequency/choose-plan-frequency.module').then(m => m.ChoosePlanFrequencyPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'add-amount',
    loadChildren: () => import('./pages/add-amount/add-amount.module').then( m => m.AddAmountPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
