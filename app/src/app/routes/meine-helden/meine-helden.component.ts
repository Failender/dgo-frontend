import { Component, OnInit } from '@angular/core';
import {HeldDto, HeldenService} from 'dgo-components';
import {TableColumn, TableEditEvent} from 'dgo-components';
import {Router} from '@angular/router';
import {AuthenticationRequiredComponent} from '../authentication-required.component';
import {TokenService} from 'dgo-components';

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
      actions: [{
        name: 'Held laden',
        click: context => this.loadHeld(context)
      }]
    }
  ];

  private loadHeld(context) {
    this.heldenService.loadHeld(context.id, context.version)
      .subscribe(daten => {
        this.router.navigateByUrl('/held/pdf');
      });
  }


  constructor(private heldenService: HeldenService, router: Router, tokenService: TokenService) {
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

