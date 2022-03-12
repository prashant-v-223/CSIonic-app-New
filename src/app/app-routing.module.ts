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
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./pages/portfolio/portfolio.module').then( m => m.PortfolioPageModule)
  },
  {
    path: 'portfolio-details',
    loadChildren: () => import('./pages/portfolio-details/portfolio-details.module').then( m => m.PortfolioDetailsPageModule)
  },
  {
    path: 'packages/:packageId',
    loadChildren: () => import('./pages/portfolio-view/portfolio-view.module').then( m => m.PortfolioViewPageModule)
  },
  {
    path: 'invest',
    loadChildren: () => import('./pages/invest/invest.module').then( m => m.InvestPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },   {
    path: 'popular-coins',
    loadChildren: () => import('./pages/popular-coins/popular-coins.module').then( m => m.PopularCoinsPageModule)
  },
  {
    path: 'popular-baskets',
    loadChildren: () => import('./pages/popular-baskets/popular-baskets.module').then( m => m.PopularBasketsPageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./pages/analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
  {
    path: 'my-wallet',
    loadChildren: () => import('./pages/my-wallet/my-wallet.module').then( m => m.MyWalletPageModule)
  },
  {
    path: 'withdraw-amount',
    loadChildren: () => import('./pages/withdraw-amount/withdraw-amount.module').then( m => m.WithdrawAmountPageModule)
  },
  {
    path: 'select-account',
    loadChildren: () => import('./pages/select-account/select-account.module').then( m => m.SelectAccountPageModule)
  },
  {
    path: 'amount-withdrawn',
    loadChildren: () => import('./pages/amount-withdrawn/amount-withdrawn.module').then( m => m.AmountWithdrawnPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'add-new-bank',
    loadChildren: () => import('./pages/add-new-bank/add-new-bank.module').then( m => m.AddNewBankPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
