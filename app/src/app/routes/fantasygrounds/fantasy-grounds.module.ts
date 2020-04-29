import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FantasyGroundsComponent} from './fantasy-grounds/fantasy-grounds.component';
import {MatCardModule} from '@angular/material/card';


const routes: Routes = [
  {
    component: FantasyGroundsComponent,
    path: ''
  }
]
@NgModule({
  declarations: [FantasyGroundsComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), MatCardModule
  ]
})
export class FantasyGroundsModule { }
