import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SteigernService} from '../../steigern/steigern.service';
import {MatDialogRef} from '@angular/material/dialog';
import {HeldInventarService} from '../held-inventar.service';
import {HeldenService} from '../../../../lib/helden/helden.service';

@Component({
  selector: 'app-add-gegenstand',
  templateUrl: './add-gegenstand.component.html',
  styleUrls: ['./add-gegenstand.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGegenstandComponent implements OnInit {

  public inventar;
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    heldid: new FormControl('', Validators.required),
    notiz: new FormControl(''),
    container: new FormControl(null),
    gewicht: new FormControl(0, Validators.required),
    anzahl: new FormControl(0, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<AddGegenstandComponent>, private inventarService: HeldInventarService, private heldenService: HeldenService) { }

  public create() {
    this.inventarService.addGegenstand(this.form.value)
      .subscribe();
  }

  ngOnInit(): void {
    this.inventar = this.inventarService.inventar;
    this.form.controls.heldid.patchValue(this.heldenService.currentHeld.id);


  }

}
