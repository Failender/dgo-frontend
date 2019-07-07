import { Component, OnInit } from '@angular/core';
import {Geldboerse, GeldService} from './geld.service';
import {HeldComponent} from '../held.component';
import {HeldenService} from '../../../held/helden.service';
import {Router} from '@angular/router';
import {TableColumn} from '../../../table/table.component';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-geld',
  templateUrl: './geld.component.html',
  styleUrls: ['./geld.component.css']
})
export class GeldComponent extends HeldComponent{

  public tableColumns: TableColumn[] = [
    {
      field: 'label',
      header: 'Name',
      type: 'string'
    },
    {
      field: 'anzahl',
      header: 'Anzahl',
      type: 'number'
    },
    {
      header: '',
      field: 'actions',
      type: 'inline-actions',
      actions: [

        {
          name: 'add',
          click: context => this.incrementEntry(context)
        },
        {
          name: 'remove',
          click: context => this.decrementEntry(context)
        },

      ]
    }

    ]

  public einheiten = [
    {
      label: 'Kreuzer',
      einheit: 1
    },
    {
      label: 'Heller',
      einheit: 10
    },
    {
      label: 'Silber',
      einheit: 100
    },
    {
      label: 'Dukaten',
      einheit: 1000
    },

  ]



  public geldboerse: Geldboerse;
  public mappedGeldboerse;

  constructor(heldenService: HeldenService, router: Router, private geldService: GeldService) {
    super(heldenService, router);
  }

  doInit() {
      this.loadGeldboerse();
  }

  private mapGeldboerse(boerse: Geldboerse) {
    this.geldboerse = boerse;
    const mappedGeldboerse = [];
    this.einheiten.forEach(einheit => {
      const amount = this.getAmount(einheit, boerse)
      mappedGeldboerse.push({
        label: einheit.label,
        anzahl: amount,
        einheit: einheit.einheit
      })
    })
    return mappedGeldboerse;
  }

  private loadGeldboerse() {
    this.geldService.getGeldBoerse(this.heldInfo.id)
      .pipe(map(boerse => {
        return this.mapGeldboerse(boerse);
      }))
      .subscribe(data => this.mappedGeldboerse= data);
  }

  public getAmount(einheit, geldboerse: Geldboerse) {
    let value = Math.floor(geldboerse.anzahl / einheit.einheit);;
    if(einheit.einheit === 1000) {
      return value;
    }
    return value % 10;
  }

  private incrementEntry(context) {

    this.geldboerse.anzahl += context.einheit;
    this.persistGeldboerse();

  }

  private decrementEntry(context) {
    this.geldboerse.anzahl -= context.einheit;
    this.persistGeldboerse();
  }

  private persistGeldboerse() {
    if(!this.geldboerse.id) {
      this.mappedGeldboerse = null;
      //This entity is not persistant yet, save it once and request wait for the return of the id..
      this.geldService.updateGeldboerse(this.geldboerse)
        .subscribe(data => {
          this.geldboerse = data;
          this.mappedGeldboerse = this.mapGeldboerse(this.geldboerse);
        })
    } else {
      this.mappedGeldboerse = this.mapGeldboerse(this.geldboerse);
      this.geldService.updateGeldboerse(this.geldboerse)
        .subscribe();
    }

  }


}
