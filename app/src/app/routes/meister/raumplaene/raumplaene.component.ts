import { Component, OnInit } from '@angular/core';
import {Raumplan, RaumplanService} from './raumplan.service';
import {MatDialog} from '@angular/material';
import {InputDialogComponent, TableColumn} from 'dgo-components';
import {Router} from '@angular/router';

@Component({
  selector: 'app-raumplaene',
  templateUrl: './raumplaene.component.html',
  styleUrls: ['./raumplaene.component.css']
})
export class RaumplaeneComponent implements OnInit {


  public tableColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: 'Erstellungsdatum',
      field: 'createdDate',
      type: 'string'
    },
    {
      header: '',
      field: 'actions',
      type: 'inline-actions',
      actions: [
        {
          name: 'open_with',
          click: context => this.loadRaumplan(context)
        },
        {
          name: 'delete',
          click: context => this.deleteRaumplan(context)
        }
      ]
    }
  ];

  public raumplaene: Raumplan[];

  constructor(private raumplanService: RaumplanService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.loadRaumplaene();

  }

  addRaumplan() {
    const dialogRef = this.dialog.open(InputDialogComponent);
    dialogRef.componentInstance.fields = [
      {
        type: 'string',
        name: 'name',
        label: 'Name'
      }
    ]
    dialogRef.afterClosed()
      .subscribe(data => {
        if(!data) {
          return;
        }
        this.raumplanService.saveRaumplan(data)
          .subscribe(() => this.loadRaumplaene());
      });
  }

  private loadRaumplaene() {
    this.raumplanService.getRaumplaene()
      .subscribe(data => this.raumplaene = data);
  }

  private loadRaumplan(raumplan: Raumplan) {
    this.router.navigateByUrl(`meister/raumplan/${raumplan.id}`);
  }

  private deleteRaumplan(raumplan: Raumplan) {
    this.raumplanService.deleteRaumplan(raumplan.id)
      .subscribe(() => this.loadRaumplaene());
  }

}
