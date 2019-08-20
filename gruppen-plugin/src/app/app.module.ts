import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {SharedModule, AppComponent} from 'dgo-components';

import {GruppenModule} from './gruppen-plugin/gruppen.module';
import {RouterModule, Routes} from '@angular/router';
import {GruppenComponent} from './gruppen-plugin/gruppen/gruppen.component';
import {environment} from '../environments/environment';
import {createCustomElement} from '@angular/elements';


declare var env;

const routes: Routes = [
  { path: '**', component: GruppenComponent }
];
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    GruppenModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    env = environment;

    const myElement = createCustomElement(GruppenComponent, { injector });
    customElements.define('gruppen-plugin', myElement);
    console.debug('REGI')

  }
}

declare var customElements;


