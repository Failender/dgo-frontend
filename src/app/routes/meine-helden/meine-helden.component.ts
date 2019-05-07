import { Component, OnInit } from '@angular/core';
import {HeldDto, HeldenService} from '../../held/helden.service';
import {TableColumn, TableEditEvent} from '../../table/table.component';

@Component({
  selector: 'app-meine-helden',
  templateUrl: './meine-helden.component.html',
  styleUrls: ['./meine-helden.component.css']
})
export class MeineHeldenComponent implements OnInit {

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
  ]

  private loadHeld(context) {
    this.heldenService.getHeld(context.id)
      .subscribe(daten => {
        console.debug(daten);
        this.heldenService.held = daten;
      })
  }


  constructor(private heldenService: HeldenService) {

  }

  onEdit(event: TableEditEvent) {
    if (event.column.field === 'active') {
      this.heldenService.updateActive(event.row.id, event.row.active)
        .subscribe(data => {
          console.debug('DONE');
        });
    } else if(event.column.field === 'public') {
      this.heldenService.updatePublic(event.row.id, event.row.public)
        .subscribe(data => {
          console.debug('DONE');
        });
    }
    console.debug(event)
  }

  ngOnInit() {
    this.heldenService.getMeineHelden()
      .subscribe(data => {
        this.helden = data;
      });
  }

}
