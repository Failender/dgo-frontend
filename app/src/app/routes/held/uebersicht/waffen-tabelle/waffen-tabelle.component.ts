import {Component} from '@angular/core';
import {HeldComponent} from '../../held.component';
import {Router} from '@angular/router';
import {HeldenService} from "../../../../lib/helden/helden.service";
import {TableColumn} from "../../../../lib/components/table/table.component";

@Component({
  selector: 'app-waffen-tabelle',
  templateUrl: './waffen-tabelle.component.html',
  styleUrls: ['./waffen-tabelle.component.css']
})
export class WaffenTabelleComponent extends HeldComponent{

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
      field: 'dk',
      header: 'DK',
      type: 'string'
    },
    {
      field: 'tp',
      header: 'TP',
      type: 'number'
    },
    {
      field: 'tpKKValue',
      header: 'TP/KK',
      type: 'string'
    },
    {
      field: 'ini',
      header: 'Ini',
      type: 'number'
    },
    {
      field: 'wm',
      header: 'WM',
      type: 'string'
    },
    {
      field: 'at',
      header: 'AT',
      type: 'string'
    },
    {
      field: 'pa',
      header: 'PA',
      type: 'string'
    },
    {
      field: 'tpinkl',
      header: 'TP',
      type: 'string'
    },

  ];

  public data;

  doInit() {
    this.data = this.held.kampfsets.kampfset[0].nahkampfwaffen.nahkampfwaffe;

  }



}
