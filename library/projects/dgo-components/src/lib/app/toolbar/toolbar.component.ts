import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TokenService} from "../../token/token.service";
import {LoginDialogComponent} from "../login/login-dialog.component";
import {GruppenService} from '../../gruppen.service';

@Component({
  selector: 'dgo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @Output() public toggleMenu = new EventEmitter<void>();

  public gruppen;

  public get authenticated() {
    return this.tokenService.tokenObs
      .pipe(map(value => value != null));
  }

  constructor(private gruppenService: GruppenService, private dialog: MatDialog, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.gruppenService.getAll()
      .subscribe(data => this.gruppen = data);
  }

  login() {
    this.dialog.open(LoginDialogComponent);

  }

  logout() {
    this.tokenService.token = null;
    this.router.navigateByUrl('/home');
  }

  onGruppeSelect(event) {
    this.gruppenService.selectGroup(event.source.value);
  }

}
