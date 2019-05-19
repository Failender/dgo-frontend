import { Component, OnInit } from '@angular/core';
import {HeldComponent} from '../held.component';
import {HeldenService} from '../../../held/helden.service';
import {Router} from '@angular/router';
import {HeldInventarService} from './held-inventar.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../shared/notification.service';

@Component({
  selector: 'app-inventar',
  templateUrl: './inventar.component.html',
  styleUrls: ['./inventar.component.css']
})
export class InventarComponent extends HeldComponent {


  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    heldid: new FormControl('', Validators.required),
    container: new FormControl(null),
    gewicht: new FormControl(0, Validators.required),
    anzahl: new FormControl(0, Validators.required)
  });

  public inventar;

  public tableColumns = [];

  constructor(heldService: HeldenService, router: Router, private heldInventarService: HeldInventarService, private notificationService: NotificationService) {
    super(heldService, router);

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
    console.debug(this.form.value)
    this.heldInventarService.addGegenstand(this.form.value)
      .subscribe(() => {
        this.loadInventar();
        this.notificationService.info('Gegenstand hinzugefügt!');
      });
  }

}
