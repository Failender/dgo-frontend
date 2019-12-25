import {Component, OnDestroy} from '@angular/core';
import {AP, SteigernService, SteigerungsTalent} from './steigern.service';
import {HeldComponent} from '../held.component';
import {Router} from '@angular/router';

import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {AddEreignisDialogComponent} from './add-ereignis.dialog/add-ereignis.dialog.component';
import {TableColumn} from "../../../lib/components/table/table.component";
import {HeldenService} from "../../../lib/helden/helden.service";

@Component({
  selector: 'app-steigern',
  templateUrl: './steigern.component.html',
  styleUrls: ['./steigern.component.css']
})
export class SteigernComponent extends HeldComponent implements OnDestroy{


  public ap: AP;
  public steigerungen: SteigerungsTalent[];

  private onDestroy = new Subject();
  private editSub = new Subject();

  private editedRows: any = {};

  public tableColumns: TableColumn[] = [
    {
      field: 'se',
      header: 'SE',
      type: 'boolean-edit'
    },
    {
      field: 'talent',
      header: 'Talent',
      type: 'string'
    },
    {
      field: 'lernmethode',
      header: 'Lernmethode',
      type: 'lookup',
      lookups: [
        {
          description: 'Lehrmeister',
          identifier: 'Lehrmeister'
        },
        {
          description: 'Gegenseitiges Lehren',
          identifier: 'Gegenseitiges Lehren'
        },
        {
          description: 'Selbststudium',
          identifier: 'Selbststudium'
        },
        {
          description: 'Freie Steigerung',
          identifier: 'Freie Steigerung'
        },
      ]
    },
    {
      field: 'talentwert',
      header: 'Talentwert',
      type: 'number'
    },
    {
      field: 'art',
      header: 'Art',
      type: 'number'
    },
    {
      field: 'kosten',
      header: 'Kosten',
      type: 'number'
    },

    {
      header: '',
      field: 'actions',
      type: 'inline-actions',
      actions: [
        {
          name: 'keyboard_arrow_up',
          click: context => this.steigern(context),
          condition: context => {
            if (context.kosten === '...') {
              return false;
            }
            if (!this.ap) {
              return false;
            }
            return context.kosten <= this.ap.frei;
          }
        }
      ]
    }
  ];

  constructor(heldenService: HeldenService, router: Router, private steigernService: SteigernService, private dialog: MatDialog) {
    super(heldenService, router);
  }

  doInit() {
    this.steigernService.getApUncached(this.heldInfo.id)
      .subscribe(data => this.ap = data);
    this.steigernService.getSteigerungsTalente(this.heldInfo.id)
      .subscribe(data => this.steigerungen = data);

    this.editSub
      .pipe(debounceTime(5000), takeUntil(this.onDestroy))
      .subscribe(() => {
        const body = Object.keys(this.editedRows).map(key => this.editedRows[key]);
        body.forEach(entry => entry.kosten = 0);
        this.steigernService.updateSteigerungsTalente(this.heldInfo.id, body)
          .subscribe(data => this.steigerungen = data);

        this.editedRows = {};
        this.steigerungen = null;

      });
  }

  private steigern(context) {
    this.ap.frei -= context.kosten;
    this.steigernService.steigern(this.heldInfo.id, context)
      .subscribe(data => {
        this.steigerungen = data;
      });
    context.kosten = '...';
  }

  public onEdit(event) {
    this.editedRows[event.row.talent] = event.row;
    event.row.kosten = '...';
    this.editSub.next();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  public addEreignis() {
    const dialogRef = this.dialog.open(AddEreignisDialogComponent);
    dialogRef.componentInstance.held = this.heldInfo.id;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.ap = result;
        }
        console.debug(result);
      });
  }


}
