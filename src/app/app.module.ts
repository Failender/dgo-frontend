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
  MatSidenavModule, MatSlideToggleModule, MatSnackBar, MatSnackBarModule, MatTableModule,
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
import {HeldenService, initializeHeld} from './held/helden.service';
import {PDFSource, PdfViewerModule} from 'ng2-pdf-viewer';
import { PdfComponent } from './shared/pdf/pdf.component';
import { ZauberComponent } from './routes/held/zauber/zauber.component';
import {SourcePdfComponent} from './routes/held/pdf/source-pdf.component';
import { ManageUserComponent } from './routes/admin/manage-user/manage-user.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meine-helden', component: MeineHeldenComponent},
  {
    path: 'held',
    children: [
      {path: 'uebersicht', component: UebersichtComponent},
      {path: 'zauber', component: ZauberComponent}
    ]
  },
  {
    path: 'administration',
    children: [
      {path: 'manage-user', component: ManageUserComponent}
    ]
  },
  {path: 'pdf/:source/:id', component: SourcePdfComponent},

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
      UebersichtComponent,
      PdfComponent,
      SourcePdfComponent,
      ZauberComponent,
      ManageUserComponent
  ],
    entryComponents: [
      LoginDialogComponent

    ],
  imports: [
    PdfViewerModule,
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
    MatSnackBarModule,
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
      deps: [TokenService, MatSnackBar],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeHeld,
      multi: true,
      deps: [HeldenService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
