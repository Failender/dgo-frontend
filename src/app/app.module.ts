import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSlideToggleModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LoginDialogComponent} from './login/login-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Interceptor} from './authentication/interceptor';
import {TokenService} from './authentication/token.service';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MeineHeldenComponent } from './routes/meine-helden/meine-helden.component';
import { TableComponent } from './table/table.component';
import {MenuListItemComponent} from './menu/menu-list-item.component';
import { UebersichtComponent } from './routes/held/uebersicht/uebersicht.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meine-helden', component: MeineHeldenComponent},
  {
    path: 'held',
    children: [
      {
        path: 'uebersicht',
        component: UebersichtComponent
      }
    ]
  },

  { path: '**', redirectTo : '/home' }
]

@NgModule({
  declarations: [
      AppComponent,
      ToolbarComponent,
      LoginDialogComponent,
      MenuListItemComponent,
      HomeComponent,
      MeineHeldenComponent,
      TableComponent,
      UebersichtComponent
  ],
    entryComponents: [
      LoginDialogComponent

    ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    ),
    MatSlideToggleModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      deps: [TokenService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
