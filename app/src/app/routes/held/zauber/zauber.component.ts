import { Component, OnInit } from '@angular/core';
import {HeldenService, Zauber} from '../../../held/helden.service';
import {Router} from '@angular/router';
import {TokenService} from '../../../authentication/token.service';
import {HeldComponent} from '../held.component';
import {TableColumn} from '../../../table/table.component';

@Component({
  selector: 'app-zauber',
  templateUrl: './zauber.component.html',
  styleUrls: ['./zauber.component.css']
})
export class ZauberComponent extends HeldComponent{


  private actionColumn = {
    header: '',
    field: 'actions',
    type: 'inline-actions',
    actions: []
  };

  public tableData;
  public tableColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Probe',
      field: 'probe',
      type: 'string'
    },
    {
      header: 'Rep',
      field: 'repraesentation',
      type: 'string'
    },
    {
      header: 'TAW',
      field: 'wert',
      type: 'string'
    },
    this.actionColumn
  ]

  constructor(heldenService: HeldenService, router: Router, private tokenService: TokenService) {
    super(heldenService, router);
  }

  doInit() {
    this.tableData = this.held.zauberliste.zauber;
    if (this.tokenService.visiblePdfs.indexOf('lcd') !== -1) {
      this.actionColumn.actions = [{
        name: 'book',
        click: context => this.liber(context)
      }];
    }
  }

  private liber(context: Zauber) {
    this.router.navigateByUrl(`/pdf/lcd/${context.quelle.seite}`);

  }

}
