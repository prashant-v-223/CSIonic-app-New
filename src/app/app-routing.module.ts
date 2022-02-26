import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'choose-plan',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/choose-plan/choose-plan.module').then(m => m.ChoosePlanPageModule)
  },
  {
    path: 'choose-plan-frequency',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/choose-plan-frequency/choose-plan-frequency.module').then(m => m.ChoosePlanFrequencyPageModule)
  },
  {
    path: 'add-amount',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/add-amount/add-amount.module').then(m => m.AddAmountPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'error/:errorType',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
