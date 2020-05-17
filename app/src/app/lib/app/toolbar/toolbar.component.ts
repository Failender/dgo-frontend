import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginDialogComponent} from "../login/login-dialog.component";
import {Gruppe, GruppenService} from '../../gruppen.service';
import {TokenService} from "../../../authentication/token.service";
import {Observable} from 'rxjs';

@Component({
  selector: 'dgo-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @Output() public toggleMenu = new EventEmitter<void>();

  public gruppen;

  private GRUPPE_KEY = "dgo_gruppe";

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
    this.tokenService.logout();
    this.router.navigateByUrl('/home');
  }

  onGruppeSelect(event: Gruppe) {
    localStorage.setItem(this.GRUPPE_KEY, '' + event.id);

    this.gruppenService.selectGroup(event);
  }

  public getSelectedGruppe(): Observable<Gruppe> {
    return this.gruppenService.getAll()
      .pipe(map(data => {
        const selected = localStorage.getItem(this.GRUPPE_KEY) != null ? parseInt(localStorage.getItem(this.GRUPPE_KEY), 10) : null;
        if (!selected) {
          return data[0];
        }
        const gruppe = data.find(entry => entry.id === selected);
        if (gruppe) {
          this.gruppenService.selectGroup(gruppe);
          return gruppe;
        }
        return data[0];
      }));
  }

}
