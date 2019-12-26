import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {ToolbarComponent} from "./app/toolbar/toolbar.component";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from "@angular/common";
import {MenuListItemComponent} from "./menu/menu-list-item.component";
import {RouterModule} from "@angular/router";
import {LoginDialogComponent} from "./app/login/login-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputDialogComponent} from './components/input-dialog/input-dialog.component';
import {TableComponent} from './components/table/table.component';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  providers: [],
  imports: [MatIconModule, MatSelectModule, MatSortModule,
    MatDialogModule, HttpClientModule, MatSidenavModule, MatListModule, CommonModule, RouterModule, MatIconModule, MatToolbarModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSlideToggleModule, MatMenuModule, MatTableModule, MatTooltipModule, MatSelectModule, MatCheckboxModule],
  declarations: [AppComponent, ToolbarComponent, MenuListItemComponent, LoginDialogComponent, InputDialogComponent, TableComponent, InfoDialogComponent],
  exports: [HttpClientModule, TableComponent, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTableModule,
    MatButtonModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule
  ],
  entryComponents: [LoginDialogComponent, InputDialogComponent, InfoDialogComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
