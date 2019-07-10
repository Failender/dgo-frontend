import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import {MeisterPluginComponent} from './meister-plugin/meister-plugin.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MeisterPluginComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: MeisterPluginComponent
      }
    ])
  ]
})
export class MeisterPluginModule {
}
