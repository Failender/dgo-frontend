import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {KampfComponent} from './kampf.component';
import {ErstellenComponent} from './erstellen/erstellen.component';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule, MatCardModule, MatIconModule, MatSelectModule} from '@angular/material';
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
