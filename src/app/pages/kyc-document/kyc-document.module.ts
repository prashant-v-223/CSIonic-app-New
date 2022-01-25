import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KYCDocumentPage } from './kyc-document.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: KYCDocumentPage
  },
  {
    path: 'id-verification',
    loadChildren: () => import('../id-verification/id-verification.module').then(m => m.IdVerificationPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [KYCDocumentPage]
})
export class KYCDocumentPageModule { }
