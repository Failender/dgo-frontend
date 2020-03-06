import {Component} from '@angular/core';
import {HeldComponent} from '../held.component';
import {Router} from '@angular/router';
import {HeldInventar, HeldInventarService} from './held-inventar.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../shared/notification.service';
import {TableColumn} from "../../../lib/components/table/table.component";
import {HeldenService} from "../../../lib/helden/helden.service";
import {MatDialog} from '@angular/material/dialog';
import {AddGegenstandComponent} from './add-gegenstand/add-gegenstand.component';

@Component({
  selector: 'app-inventar',
  templateUrl: './inventar.component.html',
  styleUrls: ['./inventar.component.css']
})
export class InventarComponent extends HeldComponent {


  public inventar;

  constructor(heldService: HeldenService, router: Router, private heldInventarService: HeldInventarService, private notificationService: NotificationService,
              private dialog: MatDialog) {
    super(heldService, router);

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


  doInit() {
    // this.form.controls.heldid.patchValue(this.heldenService.currentHeld.id);
    this.inventar = this.heldInventarService.inventar;
  }


  public addInventar() {
    this.dialog.open(AddGegenstandComponent);
    /*
    this.heldInventarService.addGegenstand(this.form.value)
      .subscribe(() => {

        this.doInit();
        this.notificationService.info('Gegenstand hinzugefügt!');
      });
    this.form.reset();

     */
  }

}
