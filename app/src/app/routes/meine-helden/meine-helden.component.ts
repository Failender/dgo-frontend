import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationRequiredComponent} from '../authentication-required.component';
import {AlleVersionenDialogComponent} from '../../shared/held/alle-versionen-dialog/alle-versionen-dialog.component';
import {HeldDto, HeldenService} from "../../lib/helden/helden.service";
import {TableColumn, TableEditEvent} from "../../lib/components/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../authentication/token.service";
import {NotificationService} from "../../shared/notification.service";
import {VersionVergleichDialogComponent} from "../../shared/held/version-vergleich-dialog/version-vergleich-dialog.component";

@Component({
  selector: 'app-meine-helden',
  templateUrl: './meine-helden.component.html',
  styleUrls: ['./meine-helden.component.css']
})
export class MeineHeldenComponent extends AuthenticationRequiredComponent{

  public helden: HeldDto[];

  public tableColumns: TableColumn[] = this.buildColumns();

  private loadHeld(context) {
    this.heldenService.loadHeld(context.id, context.version)
      .subscribe(daten => {
        this.router.navigateByUrl('/held/pdf');
      });
  }

  private compareWithVersion(context: HeldDto) {
    const dialogRef = this.dialog.open(VersionVergleichDialogComponent, {minWidth: '100vw'});
    dialogRef.componentInstance.held = context.id;
    dialogRef.componentInstance.biggestVersion = context.version;

  }

  private showAllVersions(context) {
      const id = context.id;
      const dialogRef = this.dialog.open(AlleVersionenDialogComponent, {minWidth: '100vw'})
      dialogRef.componentInstance.held = id;

    }


  constructor(private dialog: MatDialog, private heldenService: HeldenService, router: Router, tokenService: TokenService, private notificationService: NotificationService) {
    super(tokenService, router);
  }

  onEdit(event: TableEditEvent) {
    if (event.column.field === 'active') {
      this.heldenService.updateActive(event.row.id, event.row.active)
        .subscribe(data => {
        });
    } else if (event.column.field === 'public') {
      this.heldenService.updatePublic(event.row.id, event.row.public)
        .subscribe(data => {
        });
    }
  }

  doInit() {
    this.heldenService.getMeineHelden()
      .subscribe(data => {
        this.helden = data;
        this.compareWithVersion(data[0]);
      });
  }

  public syncHeldenOnline() {
    this.heldenService.syncHeldenOnline()
      .subscribe(result => {
        let message = 'Synchronization abgeschlossen. ';
        if (result.created) {
          message += `${result.created} Helden erstellt. `;
        }
        if (result.updated) {
          message += `${result.updated} Helden aktualisiert. `;
        }
        if(result.created || result.updated) {
          this.doInit();
        }
        this.notificationService.info(message);
      });
  }

  public syncDso() {
    this.heldenService.syncDso()
      .subscribe(result => {
        let message = 'Synchronization abgeschlossen. ';
        if (result.updated) {
          message += `${result.updated} Helden aktualisiert. `;
          this.doInit();
        }
        this.notificationService.info(message);
      });
  }

  private buildColumns() {
    const columns = [];
    columns.push({
      header: 'Name',
      field: 'name',
      type: 'string'
    });

    if (window.innerWidth > 1000) {
      columns.push({
        header: 'Letzte Änderung',
        field: 'lastChange',
        type: 'string'
      });
    }

    columns.push(...[{
      header: 'Version',
      field: 'version',
      type: 'string'
    },
      {
        header: 'Öffentlich',
        field: 'public',
        typeEvaluator: column => column.editable ? 'boolean-edit' : 'boolean'
      },
      {
        header: 'Aktiv',
        field: 'active',
        typeEvaluator: column => column.editable ? 'boolean-edit' : 'boolean'
      },
      {
        header: '',
        field: 'actions',
        type: 'actions',
        actions: [
          {
            name: 'Held laden',
            click: context => this.loadHeld(context)
          },
          {
            name: 'Alle Versionen anzeigen',
            click: context => this.showAllVersions(context)
          },
          {
            name: 'Mit voriger Version vergleichen',
            click: context => this.compareWithVersion(context)
          }
        ]
      }]);
    return columns;
  }

}

