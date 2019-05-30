import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  MatButtonModule, MatCardModule,
  MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatSnackBar, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
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
import {HeldenService, initializeHeld} from './held/helden.service';
import {PDFSource, PdfViewerModule} from 'ng2-pdf-viewer';
import { PdfComponent } from './shared/pdf/pdf.component';
import { ZauberComponent } from './routes/held/zauber/zauber.component';
import {SourcePdfComponent} from './routes/held/source-pdf/source-pdf.component';
import { ManageUserComponent } from './routes/admin/manage-user/manage-user.component';
import { ZauberspeicherComponent } from './routes/held/zauberspeicher/zauberspeicher.component';
import {NotificationService} from './shared/notification.service';
import { ZauberspeicherExecuteComponent } from './routes/held/zauberspeicher/zauberspeicher-execute/zauberspeicher-execute.component';
import { UebersichtComponent } from './routes/held/uebersicht/uebersicht.component';
import {HeldPdfComponent} from './routes/held/pdf/held-pdf.component';
import { InventarComponent } from './routes/held/inventar/inventar.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meine-helden', component: MeineHeldenComponent},
  {
    path: 'held',
    children: [
      {path: 'pdf', component: HeldPdfComponent},
      {path: 'zauber', component: ZauberComponent},
      {path: 'inventar', component: InventarComponent},
      {path: 'uebersicht', component: UebersichtComponent},
      {path: 'zauberspeicher', component: ZauberspeicherComponent}
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
      PdfComponent,
      HeldPdfComponent,
      SourcePdfComponent,
      ZauberComponent,
      ManageUserComponent,
      ZauberspeicherComponent,
      ZauberspeicherExecuteComponent,
      UebersichtComponent,
      InventarComponent
  ],
    entryComponents: [
      LoginDialogComponent, ZauberspeicherExecuteComponent

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
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: false}
    ),
    MatSlideToggleModule,
    MatMenuModule,
    MatGridListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      deps: [TokenService, NotificationService],
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
