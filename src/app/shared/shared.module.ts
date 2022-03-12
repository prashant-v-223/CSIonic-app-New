import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AllowableExtensions } from './helper/allowableExtension';
import { PackageCardComponent } from './components/package-card/package-card.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CoinStackComponent } from './components/coin-stack/coin-stack.component';

const MODULES = [
  CommonModule,
  RouterModule,
  IonicModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  FormsModule,
  ReactiveFormsModule,
  MatProgressBarModule,
  MatRippleModule,
  FontAwesomeModule,
  MatProgressSpinnerModule
];
const COMPONENTS = [
  PieChartComponent,
  LineChartComponent,
  CalendarComponent,
  PlanListComponent,
  LoadingComponent,

  PackageCardComponent,
  CoinStackComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ...MODULES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    AllowableExtensions,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SharedModule { }
