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
    {
      header: '',
      field: 'actions',
      type: 'actions',
      actions: [{
        name: 'Liber',
        click: context => this.liber(context)
      }]
    }
  ]

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }

  doInit() {
    console.debug(this.held);
    this.tableData = this.held.zauberliste.zauber;
  }

  private liber(context: Zauber) {
    console.debug(context)

  }

}
