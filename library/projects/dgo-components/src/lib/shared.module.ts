import {ModuleWithProviders, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {ToolbarComponent} from "./app/toolbar/toolbar.component";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from "@angular/material";
import {CommonModule} from "@angular/common";
import {MenuListItemComponent} from "./menu/menu-list-item.component";
import {RouterModule} from "@angular/router";
import {LoginDialogComponent} from "./app/login/login-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  providers: [],
  imports: [HttpClientModule, MatSidenavModule, MatListModule, CommonModule, RouterModule.forRoot([]), MatIconModule, MatToolbarModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  declarations: [AppComponent, ToolbarComponent, MenuListItemComponent, LoginDialogComponent],
  exports: [HttpClientModule],
  entryComponents: [LoginDialogComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
