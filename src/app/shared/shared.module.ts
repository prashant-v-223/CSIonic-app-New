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
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CalendarComponent } from './components/calendar/calendar.component';

const MODULES = [
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
];
const COMPONENTS = [
  PieChartComponent,
  LineChartComponent,
  CalendarComponent
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
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class SharedModule { }
