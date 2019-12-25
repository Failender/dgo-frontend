import {Component, OnInit} from '@angular/core';
import {HeldInventar, HeldInventarService} from '../held-inventar.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../../shared/notification.service';
import {TableColumn} from "../../../../lib/components/table/table.component";
import {HeldenService} from "../../../../lib/helden/helden.service";

@Component({
  selector: 'app-inventar-tabelle',
  templateUrl: './inventar-tabelle.component.html',
  styleUrls: ['./inventar-tabelle.component.css']
})
export class InventarTabelleComponent implements OnInit {

  public inventar;

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
        },
        {
          name: 'info',
          tooltip: context => context.notiz
        }
      ]
    }
  ];

  constructor(heldService: HeldenService, router: Router, private heldInventarService: HeldInventarService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.inventar = this.heldInventarService.inventar;
  }

  private deleteEntry(inventar: HeldInventar) {
    this.heldInventarService.delete(inventar.id)
      .subscribe(() => {
        this.notificationService.info('Gegenstand entfernt');
      });
  }

  private decrementEntry(inventar: HeldInventar) {
    this.heldInventarService.updateAnzahl(inventar.id, inventar.anzahl - 1)
      .subscribe();
  }

  private incrementEntry(inventar: HeldInventar) {

    this.heldInventarService.updateAnzahl(inventar.id, inventar.anzahl + 1)
      .subscribe(
      );
  }


}
