import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {GruppenComponent} from './gruppen/gruppen.component';
import {createCustomElement} from '@angular/elements';
import {environment} from '../../environments/environment';

@NgModule({
  declarations: [
    GruppenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
})
export class GruppenModule {

}


declare var customElements;
