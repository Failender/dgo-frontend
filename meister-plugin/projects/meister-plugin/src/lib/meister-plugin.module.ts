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
import {MeisterPluginRoutingModule} from './meister-plugin-routing.module';

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
    MeisterPluginRoutingModule
  ]
})
export class MeisterPluginModule {
}
