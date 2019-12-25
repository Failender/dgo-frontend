import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationRequiredComponent} from '../authentication-required.component';
import {AlleVersionenDialogComponent} from '../../shared/held/alle-versionen-dialog-component/alle-versionen-dialog.component';
import {HeldDto, HeldenService} from "../../lib/helden/helden.service";
import {TableColumn, TableEditEvent} from "../../lib/components/table/table.component";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../authentication/token.service";

@Component({
  selector: 'app-meine-helden',
  templateUrl: './meine-helden.component.html',
  styleUrls: ['./meine-helden.component.css']
})
export class MeineHeldenComponent extends AuthenticationRequiredComponent{

  public helden: HeldDto[];

  public tableColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Gruppe',
      field: 'gruppe',
      type: 'string'
    },
    {
      header: 'Letzte Änderung',
      field: 'lastChange',
      type: 'string'
    },
    {
      header: 'Version',
      field: 'version',
      type: 'string'
    },
    {
      header: 'Öffentlich',
      field: 'public',
      type: 'boolean-edit'
    },
    {
      header: 'Aktiv',
      field: 'active',
      type: 'boolean-edit'
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
        }
      ]
    }
  ];

  private loadHeld(context) {
    this.heldenService.loadHeld(context.id, context.version)
      .subscribe(daten => {
        this.router.navigateByUrl('/held/pdf');
      });
  }

private showAllVersions(context) {
    const id = context.id;
    const dialogRef = this.dialog.open(AlleVersionenDialogComponent, {minWidth: '80vw'})
    dialogRef.componentInstance.held = id;

  }


  constructor(private dialog: MatDialog, private heldenService: HeldenService, router: Router, tokenService: TokenService) {
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
      });
  }

}

