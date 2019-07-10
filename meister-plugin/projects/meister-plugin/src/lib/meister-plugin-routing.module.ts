import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MeisterPluginComponent} from './meister-plugin/meister-plugin.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MeisterPluginComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MeisterPluginRoutingModule {
}
