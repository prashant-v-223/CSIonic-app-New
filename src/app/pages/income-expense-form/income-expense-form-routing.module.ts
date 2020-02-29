import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomeExpenseFormPage } from './income-expense-form.page';

const routes: Routes = [
  {
    path: '',
    component: IncomeExpenseFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeExpenseFormPageRoutingModule {}
