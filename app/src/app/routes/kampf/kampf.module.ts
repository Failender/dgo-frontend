import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {KampfComponent} from './kampf.component';
import {ErstellenComponent} from './erstellen/erstellen.component';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {TeilnehmerDetailComponent} from './teilnehmer-detail/teilnehmer-detail.component';
import {SharedModule} from "../../lib/shared.module";


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
  declarations: [KampfComponent, ErstellenComponent, TeilnehmerDetailComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, FormsModule, MatCardModule, MatIconModule, MatButtonToggleModule, MatSelectModule
  ]
})
export class KampfModule { }
