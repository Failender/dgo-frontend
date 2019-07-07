import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../../held.component';
import {TableColumn} from '../../../../table/table.component';
import {HeldenService} from '../../../../held/helden.service';
import {Router} from '@angular/router';
import {TokenService} from '../../../../authentication/token.service';

@Component({
  selector: 'app-fernkampf-waffen-tabelle',
  templateUrl: './fernkampf-waffen-tabelle.component.html',
  styleUrls: ['./fernkampf-waffen-tabelle.component.css']
})
export class FernkampfWaffenTabelleComponent extends HeldComponent{

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }


  public columns: TableColumn[] = [
    {
      field: 'name',
      header: 'Name',
      type: 'string'
    },
    {
      field: 'ladezeit',
      header: 'Ladezeit',
      type: 'number'
    },
    {
      field: 'tp',
      header: 'TP',
      type: 'number'
    },
    {
      field: 'reichweite',
      header: 'Reichweite',
      type: 'string'
    },
    {
      field: 'tpmod',
      header: 'TP/Entfernung',
      type: 'string'
    },
    {
      field: 'at',
      header: 'AT',
      type: 'string'
    },


  ];

  public data;

  doInit() {
    this.data = this.held.kampfsets.kampfset[0].fernkampfwaffen.fernkampfwaffe;

  }



}
