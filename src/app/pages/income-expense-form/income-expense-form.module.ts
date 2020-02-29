import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomeExpenseFormPageRoutingModule } from './income-expense-form-routing.module';

import { IncomeExpenseFormPage } from './income-expense-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    IncomeExpenseFormPageRoutingModule
  ],
  declarations: [IncomeExpenseFormPage]
})
export class IncomeExpenseFormPageModule {}
