import {Component, OnDestroy} from '@angular/core';
import {Geldboerse, GeldService} from './geld.service';
import {HeldComponent} from '../held.component';
import {Router} from '@angular/router';
import {debounceTime, map, takeUntil} from 'rxjs/operators';
import {TableColumn} from "../../../lib/components/table/table.component";
import {HeldenService} from "../../../lib/helden/helden.service";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-geld',
  templateUrl: './geld.component.html',
  styleUrls: ['./geld.component.css']
})
export class GeldComponent extends HeldComponent implements OnDestroy{

  private unsubscribe = new Subject();

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

  private geldBoersePersist = new Subject();

  constructor(heldenService: HeldenService, router: Router, private geldService: GeldService) {
    super(heldenService, router);
  }

  doInit() {
      this.loadGeldboerse();
      this.geldBoersePersist.pipe(takeUntil(this.unsubscribe), debounceTime(5000))
        .subscribe(() => {
          this.doPersistGeldboerse();
        });
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
      });
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
    const value = Math.floor(geldboerse.anzahl / einheit.einheit);;
    if (einheit.einheit === 1000) {
      return value;
    }
    return value % 10;
  }

  private incrementEntry(context) {

    console.debug(context);
    this.geldboerse.anzahl += context.einheit;
    this.mappedGeldboerse = this.mapGeldboerse(this.geldboerse);
    this.persistGeldboerse();

  }

  private decrementEntry(context) {
    this.geldboerse.anzahl -= context.einheit;
    this.mappedGeldboerse = this.mapGeldboerse(this.geldboerse);

    this.persistGeldboerse();
  }

  private persistGeldboerse() {
    this.geldBoersePersist.next();

  }

  private doPersistGeldboerse() {
    this.geldService.updateGeldboerse(this.geldboerse)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }


}
