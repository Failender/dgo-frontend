import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../held.component';
import {HeldenService} from '../../../lib/helden/helden.service';
import {Router} from '@angular/router';
import {TableColumn} from '../../../lib/components/table/table.component';

@Component({
  selector: 'app-talente',
  templateUrl: './talente.component.html',
  styleUrls: ['./talente.component.css']
})
export class TalenteComponent extends HeldComponent {


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
      header: 'Behinderung',
      field: 'behinderung',
      type: 'string'
    },
    {
      header: 'TAW',
      field: 'wert',
      type: 'string'
    }
  ]

  public tableData;

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }

  doInit() {
    this.tableData = this.held.talentliste.talent;
  }

}
