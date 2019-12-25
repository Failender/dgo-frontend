import {Component, OnInit} from '@angular/core';
import {RaumplanEbene, RaumplanService} from '../raumplan.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {TableColumn} from "../../../../lib/components/table/table.component";
import {InfoDialogComponent} from "../../../../lib/components/info-dialog/info-dialog.component";
import {InputDialogComponent} from "../../../../lib/components/input-dialog/input-dialog.component";

@Component({
  selector: 'app-raumplan',
  templateUrl: './raumplan.component.html',
  styleUrls: ['./raumplan.component.css']
})
export class RaumplanComponent implements OnInit {

  public ebenen: RaumplanEbene[];

  public tableColumns: TableColumn[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'string'
    },
    {
      header: '',
      field: 'actions',
      type: 'inline-actions',
      actions: [
        {
          name: 'open_with',
          click: context => this.loadEbene(context)
        },
        {
          name: 'delete',
          click: context => this.deleteEbene(context)
        }
      ]
    }
  ];

  private ebene;

  constructor(private dialog: MatDialog, private raumplanService: RaumplanService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(map(data => data.id), tap(id => this.ebene = id),
      flatMap(id => this.raumplanService.getRaumplan(id)))
      .subscribe(data => this.ebenen = data);
  }

  private loadEbene(context: RaumplanEbene) {
    const dialogRef = this.dialog.open(InfoDialogComponent);
    dialogRef.componentInstance.text = context.beschreibung;
  }

  private deleteEbene(context: RaumplanEbene) {
    this.raumplanService.deleteEbene(context.parent, context.id)
      .subscribe(() => this.loadEbenen());
  }

  public createEbene() {
    const dialogRef = this.dialog.open(InputDialogComponent);
    dialogRef.componentInstance.fields = [
      {
        type: 'string',
        name: 'name',
        label: 'Name'
      },
      {
        type: 'text',
        name: 'beschreibung',
        label: 'Beschreibung'
      }
    ]
    dialogRef.afterClosed()
      .subscribe(data => {
        if (!data) {
          return;
        }
        this.raumplanService.addToRaumplan(this.ebene, data)
          .subscribe(() => this.loadEbenen());
      });
  }

  private loadEbenen() {
    this.ebenen = null;
    this.raumplanService.getRaumplan(this.ebene)
      .subscribe(data => this.ebenen = data);
  }

}
