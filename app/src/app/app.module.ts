import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Interceptor} from './authentication/interceptor';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';
import {MeineHeldenComponent} from './routes/meine-helden/meine-helden.component';

import {PdfViewerModule} from 'ng2-pdf-viewer';
import {PdfComponent} from './shared/pdf/pdf.component';
import {ZauberComponent} from './routes/held/zauber/zauber.component';
import {SourcePdfComponent} from './routes/held/source-pdf/source-pdf.component';
import {ManageUserComponent} from './routes/admin/manage-user/manage-user.component';
import {ZauberspeicherComponent} from './routes/held/zauberspeicher/zauberspeicher.component';
import {NotificationService} from './shared/notification.service';
import {ZauberspeicherExecuteComponent} from './routes/held/zauberspeicher/zauberspeicher-execute/zauberspeicher-execute.component';

import {HeldPdfComponent} from './routes/held/pdf/held-pdf.component';
import {InventarComponent} from './routes/held/inventar/inventar.component';
import {QuicknavComponent} from './routes/held/quicknav/quicknav.component';
import {GeldComponent} from './routes/held/geld/geld.component';
import {UebersichtComponent} from './routes/held/uebersicht/uebersicht.component';
import {FernkampfWaffenTabelleComponent} from './routes/held/uebersicht/fernkampf-waffen-tabelle/fernkampf-waffen-tabelle.component';
import {WaffenTabelleComponent} from './routes/held/uebersicht/waffen-tabelle/waffen-tabelle.component';
import {RuestungTabelleComponent} from './routes/held/uebersicht/ruestung-tabelle/ruestung-tabelle.component';
import {InventarTabelleComponent} from './routes/held/inventar/inventar-tabelle/inventar-tabelle.component';

import {environment} from '../environments/environment';
import {GruppeComponent} from './routes/gruppe/gruppe/gruppe.component';
import {SteigernComponent} from './routes/held/steigern/steigern.component';
import {AddEreignisDialogComponent} from './routes/held/steigern/add-ereignis.dialog/add-ereignis.dialog.component';
import {AlleVersionenDialogComponent} from './shared/held/alle-versionen-dialog/alle-versionen-dialog.component';
import {SharedModule} from './lib/shared.module';
import {TokenService} from './authentication/token.service';
import {HeldenService, initializeHeld} from './lib/helden/helden.service';
import {AppComponent} from './lib/app/app.component';
import {MenuService} from './lib/menu/menu.service';
import {TalenteComponent} from './routes/held/talente/talente.component';
import {VersionVergleichComponent} from './shared/held/version-vergleich/version-vergleich.component';
import {EreignisseComponent} from './routes/held/ereignisse/ereignisse.component';
import {AddGegenstandComponent} from './routes/held/inventar/add-gegenstand/add-gegenstand.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'meine-helden', component: MeineHeldenComponent},
  {
    path: 'held',
    children: [
      {path: 'pdf', component: HeldPdfComponent},
      {path: 'geld', component: GeldComponent},
      {path: 'steigern', component: SteigernComponent},
      {path: 'zauber', component: ZauberComponent},
      {path: 'uebersicht', component: UebersichtComponent},
      {path: 'inventar', component: InventarComponent},
      {path: 'zauberspeicher', component: ZauberspeicherComponent},
      {path: 'talente', component: TalenteComponent},
      {path: 'ereignisse', component: EreignisseComponent},
      {path: 'vergleich/:id/:from/:to', component: VersionVergleichComponent}
    ]
  },
  {
    path: 'kampf',
    loadChildren: () => import('./routes/kampf/kampf.module').then(m => m.KampfModule)
  },
  {
    path: 'meister',
    loadChildren: () => import('./routes/meister/meister.module').then(m => m.MeisterModule)
  },
  {
    path: 'fantasygrounds',
    loadChildren: () => import('./routes/fantasygrounds/fantasy-grounds.module').then(m => m.FantasyGroundsModule)
  },
  {
    path: 'gruppe',
    component: GruppeComponent
  },
  {
    path: 'administration',
    children: [
      {path: 'manage-user', component: ManageUserComponent}
    ]
  },
  {path: 'pdf/:source/:id', component: SourcePdfComponent},

  { path: '**', redirectTo : '/home' }
];


declare var env;

@NgModule({
  declarations: [
    GruppeComponent,
    SteigernComponent,
    HomeComponent,
    MeineHeldenComponent,
    PdfComponent,
    HeldPdfComponent,
    SourcePdfComponent,
    ZauberComponent,
    ManageUserComponent,
    ZauberspeicherComponent,
    ZauberspeicherExecuteComponent,
    InventarComponent,
    QuicknavComponent,
    GeldComponent,
    UebersichtComponent,
    FernkampfWaffenTabelleComponent,
    WaffenTabelleComponent,
    RuestungTabelleComponent,
    AddEreignisDialogComponent,
    InventarTabelleComponent,
    AlleVersionenDialogComponent,
    TalenteComponent,
    EreignisseComponent,
    VersionVergleichComponent,
    AddGegenstandComponent,
  ],
  entryComponents: [
    ZauberspeicherExecuteComponent,
    AddEreignisDialogComponent,
    AlleVersionenDialogComponent,
    AddGegenstandComponent
  ],
  imports: [
    SharedModule.forRoot(),
    PdfViewerModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSliderModule,
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
    MatButtonToggleModule,
    MatChipsModule,
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



  constructor(private menuService: MenuService) {
    env = environment;
    [
      {
        displayName: 'Meine Helden',
        iconName: '',
        route: 'meine-helden',
        condition: menuService.authenticated.bind(menuService)
      },
      {
        displayName: 'Gruppe',
        route: 'gruppe'
      },
      /*


      ,
       */
       /*
      {
        displayName: 'Meister',
        children: [
          {
            displayName: 'Raumplan',
            route: 'meister/raumplan'
          }
        ]
      },

        */
      {
        displayName: 'Held',
        condition: menuService.heldLoaded.bind(menuService),
        iconName: '',
        children: [
          {
            displayName: 'PDF',
            iconName: '',
            route: 'held/pdf'
          },
          {
            displayName: 'Übersicht',
            iconName: '',
            route: 'held/uebersicht',
            condition: () => false
          },
          {
            displayName: 'Inventar',
            iconName: '',
            route: 'held/inventar',
            condition: () => false
          }, {
            displayName: 'Steigern',
            iconName: '',
            route: 'held/steigern',
            condition: () => false
          },
          {
            displayName: 'Geld',
            iconName: '',
            route: 'held/geld',
            condition: () => false
          },
          {
            displayName: 'Zauber',
            iconName: '',
            route: 'held/zauber',
            condition: menuService.hasZauber.bind(menuService)
          },
          {
            displayName: 'Zauberspeicher',
            iconName: '',
            route: 'held/zauberspeicher',
            condition: () => menuService.sf('Stabzauber: Zauberspeicher')
          },
        ]
      },
      {
        displayName: 'Administration',
        iconName: '',
        route: 'administration/manage-user',
        condition:  () => menuService.permission('CREATE_USER')
      },
      {
        displayName: 'Fantasygrounds',
        iconName: '',
        route: 'fantasygrounds',
      }
    ].forEach(item => menuService.registerItem(item));

    if (!environment.production) {
      menuService.registerItem({
        displayName: 'Kampf',
        children: [
          {
            displayName: 'Anzeige',
            route: 'kampf'
          },
          {
            displayName: 'Erstellen',
            route: 'kampf/erstellen'
          }
        ]
      });
    }
  }
}

