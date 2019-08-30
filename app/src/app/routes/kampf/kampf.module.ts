import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {KampfComponent} from './kampf.component';
import {SharedModule} from 'dgo-components';
import { ErstellenComponent } from './erstellen/erstellen.component';
import {FormsModule} from '@angular/forms';
import {MatCardModule, MatIconModule} from '@angular/material';



const routes: Routes = [
  {
    path: '',
    component: KampfComponent
  },
  {
    path: 'erstellen',
    component: ErstellenComponent
  }
]
@NgModule({
  declarations: [KampfComponent, ErstellenComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, FormsModule, MatCardModule, MatIconModule
  ]
})
export class KampfModule { }
