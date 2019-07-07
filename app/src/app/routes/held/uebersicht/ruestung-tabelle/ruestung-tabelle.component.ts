import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../../held.component';
import {TableColumn} from '../../../../table/table.component';
import {HeldenService} from 'dgo-components';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ruestung-tabelle',
  templateUrl: './ruestung-tabelle.component.html',
  styleUrls: ['./ruestung-tabelle.component.css']
})
export class RuestungTabelleComponent extends HeldComponent{

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }


  public columns: TableColumn[] = [
    {
      field: 'kopf',
      header: 'KO',
      type: 'number'
    },
    {
      field: 'brust',
      header: 'BR',
      type: 'number'
    },
    {
      field: 'ruecken',
      header: 'Rü',
      type: 'number'
    },
    {
      field: 'bauch',
      header: 'BA',
      type: 'number'
    },
    {
      field: 'linkerarm',
      header: 'LA',
      type: 'number'
    },
    {
      field: 'rechterarm',
      header: 'RA',
      type: 'number'
    },
    {
      field: 'linkesbein',
      header: 'LB',
      type: 'number'
    },
    {
      field: 'rechtesbein',
      header: 'RB',
      type: 'number'
    },
    {
      field: 'gesamt',
      header: 'Ges',
      type: 'number'
    },
    {
      field: 'gesamtschutz',
      header: 'gRS',
      type: 'number'
    },
    {
      field: 'behinderung',
      header: 'gBE',
      type: 'string'
    },


  ];

  public data;

  doInit() {
    this.data = [this.held.kampfsets.kampfset[0].ruestungzonen];

  }



}
