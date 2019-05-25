import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../held.component';
import {HeldenService} from '../../../held/helden.service';
import {Router} from '@angular/router';
import {HeldInventar, HeldInventarService} from './held-inventar.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../shared/notification.service';
import {TableColumn} from '../../../table/table.component';

@Component({
  selector: 'app-inventar',
  templateUrl: './inventar.component.html',
  styleUrls: ['./inventar.component.css']
})
export class InventarComponent extends HeldComponent {


  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    heldid: new FormControl('', Validators.required),
    notiz: new FormControl('', Validators.required),
    container: new FormControl(null),
    gewicht: new FormControl(0, Validators.required),
    anzahl: new FormControl(0, Validators.required)
  });

  public inventar: HeldInventar[];

  public tableColumns: TableColumn[] = [
    {
      field: 'anzahl',
      header: 'Anzahl',
      type: 'number'
    },
    {
      field: 'name',
      header: 'Name',
      type: 'string'
    },
    {
      field: 'gewicht',
      header: 'Gewicht',
      type: 'number'
    },
    {
      header: '',
      field: 'actions',
      type: 'inline-actions',
      actions: [
        {
          name: 'delete',
          click: context => this.deleteEntry(context)
        },
        {
          name: 'add',
          click: context => this.incrementEntry(context)
        },
        {
          name: 'remove',
          click: context => this.decrementEntry(context)
        }
      ]
    }
  ];

  constructor(heldService: HeldenService, router: Router, private heldInventarService: HeldInventarService, private notificationService: NotificationService) {
    super(heldService, router);

  }

  private deleteEntry(inventar: HeldInventar) {
    this.heldInventarService.delete(inventar.id)
      .subscribe(() => {
        this.notificationService.info('Gegenstand entfernt');
        this.loadInventar();
      });
  }

  private decrementEntry(inventar: HeldInventar) {
    this.heldInventarService.updateAnzahl(inventar.id, inventar.anzahl - 1)
      .subscribe(() => this.loadInventar());
  }

  private incrementEntry(inventar: HeldInventar) {

    this.heldInventarService.updateAnzahl(inventar.id, inventar.anzahl + 1)
      .subscribe(() => this.loadInventar());
  }




  doInit() {
    this.loadInventar();
    this.form.controls.heldid.patchValue(this.heldenService.currentHeld.id);
  }

  private loadInventar() {
    this.heldInventarService.getInventarForHeld(this.heldenService.currentHeld.id)
      .subscribe(inventar => {
        this.inventar = inventar;
      });

  }

  public addInventar() {
    this.heldInventarService.addGegenstand(this.form.value)
      .subscribe(() => {
        this.loadInventar();
        this.notificationService.info('Gegenstand hinzugefügt!');
      });
  }

}
