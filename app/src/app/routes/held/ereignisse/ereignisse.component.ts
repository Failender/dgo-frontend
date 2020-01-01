import {Component} from '@angular/core';
import {HeldComponent} from '../held.component';
import {HeldenService} from '../../../lib/helden/helden.service';
import {Router} from '@angular/router';
import {TableColumn} from '../../../lib/components/table/table.component';

@Component({
  selector: 'app-talente',
  templateUrl: './ereignisse.component.html',
  styleUrls: ['./ereignisse.component.css']
})
export class EreignisseComponent extends HeldComponent {


  public tableColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'aktion',
      type: 'string'
    },
    {
      header: 'Probe',
      field: 'object',
      type: 'string'
    },
    {
      header: 'Bemerkung',
      field: 'bemerkung',
      type: 'string'
    },
    {
      header: 'AP',
      field: 'ap',
      type: 'string'
    },
    {
      header: 'Änderung',
      field: 'aenderung',
      formatter: row => this.getChange(row),
      type: 'string'
    },
    {
      header: 'Kommentar',
      field: 'kommentar',
      type: 'string'
    },
    {
      header: 'Datum',
      field: 'date',
      type: 'date',
      formatter: row => new Date(row.date)
    }
  ]

  public tableData;

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }

  doInit() {
    this.tableData = this.held.ereignisse.ereignis;
  }

  private getChange(data: any) {
    if (data.lep !== 0) {
      return 'LEP ' + data.lep;
    }
    if (data.alterzustand === 0 && data. neuerzustand === 0 ) {
      return '';
    }
    if (data.alterzustand === 0 || data.alterzustand && (data.neuerzustand !== 0 || data.alterzustand !== 0 )) {
      return data.alterzustand + '->' + data.neuerzustand;
    }
    // Money gain event from DGO
    if (data.neuerzustand) {
      return data.neuerzustand;
    }
    return '';
  }

}
