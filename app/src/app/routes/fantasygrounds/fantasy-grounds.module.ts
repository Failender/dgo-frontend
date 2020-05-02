import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FantasyGroundsComponent} from './fantasy-grounds/fantasy-grounds.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
    component: FantasyGroundsComponent,
    path: ''
  }
]
@NgModule({
  declarations: [FantasyGroundsComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), MatCardModule, FormsModule, ReactiveFormsModule, HttpClientModule, MatSelectModule, MatCheckboxModule, MatButtonModule
  ]
})
export class FantasyGroundsModule { }
