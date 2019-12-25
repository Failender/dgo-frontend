import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material';
import {RaumplanComponent} from './raumplaene/raumplan/raumplan.component';
import {RaumplaeneComponent} from './raumplaene/raumplaene.component';
import {SharedModule} from "../../lib/shared.module";


const routes: Routes = [
  {
    component: RaumplaeneComponent,
    path: 'raumplan'
  },
  {
    component: RaumplanComponent,
    path: 'raumplan/:id'
  }
]

@NgModule({
  declarations: [RaumplaeneComponent, RaumplanComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), MatButtonModule, SharedModule
  ]
})
export class MeisterModule { }

