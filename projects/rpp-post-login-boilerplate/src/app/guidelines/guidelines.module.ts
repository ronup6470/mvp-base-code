import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidelineComponent } from './guideline/guideline.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GuidelineComponent
  }
];
@NgModule({
  declarations: [GuidelineComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GuidelinesModule { }
