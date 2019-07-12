import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {ToolbarComponent} from "./app/toolbar/toolbar.component";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatProgressSpinnerModule,
  MatSidenavModule, MatSlideToggleModule, MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {CommonModule} from "@angular/common";
import {MenuListItemComponent} from "./menu/menu-list-item.component";
import {RouterModule} from "@angular/router";
import {LoginDialogComponent} from "./app/login/login-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import {TableComponent} from './components/table/table.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';


@NgModule({
  providers: [],
  imports: [HttpClientModule, MatSidenavModule, MatListModule, CommonModule, RouterModule, MatIconModule, MatToolbarModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatSlideToggleModule, MatMenuModule, MatTableModule, MatTooltipModule],
  declarations: [AppComponent, ToolbarComponent, MenuListItemComponent, LoginDialogComponent, InputDialogComponent, TableComponent, InfoDialogComponent],
  exports: [HttpClientModule, TableComponent],
  entryComponents: [LoginDialogComponent, InputDialogComponent, InfoDialogComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
